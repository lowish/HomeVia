import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getAllPosts, createPost, updatePost, deletePost, subscribeToPosts } from "../../services/postsService";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    contactEmail: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  // Track auth changes and (re)subscribe to posts for the logged-in user
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      // Initial load
      loadPosts();
      // Real-time subscription scoped to the user
      unsubscribe = subscribeToPosts(
        (updatedPosts) => {
          setPosts(updatedPosts);
        },
        (err) => {
          console.error("posts subscription error", err);
          setSubmitError(err?.message || "Failed to load posts. If you just created an index, wait a minute and refresh.");
        }
      );
    } else {
      setPosts([]);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  const loadPosts = async () => {
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      console.error("loadPosts error", err);
      setSubmitError(err?.message || "Failed to load posts. Ensure Firestore index is built, then refresh.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processImages(files);
  };

  const processImages = (files) => {
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          images: "Please select only image files",
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({
          ...errors,
          images: "Image size should be less than 5MB",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newImages = [...images, ...validFiles];
    if (newImages.length > 10) {
      setErrors({
        ...errors,
        images: "Maximum 10 images allowed",
      });
      return;
    }

    setImages(newImages);
    setErrors({
      ...errors,
      images: "",
    });

    // Create previews
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke object URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processImages(files);
  };

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setFormData({
      title: post.title || "",
      description: post.description || "",
      location: post.location || "",
      price: post.price || "",
      contactEmail: post.contactEmail || "",
    });
    // Restore images if they exist (for Firebase, these would be URLs)
    if (post.images && Array.isArray(post.images)) {
      setImagePreviews(post.images);
      setImages([]); // Clear file objects, keep URLs
    }
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      price: "",
      contactEmail: "",
    });
    // Clear images and revoke URLs
    imagePreviews.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
    setImages([]);
    setImagePreviews([]);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!user) {
      setSuccessMessage("Please sign in to create posts.");
      setShowSuccessAlert(true);
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Upload images to Firebase Storage
      // Example Firebase Storage upload:
      // const imageUrls = await Promise.all(
      //   images.map(async (image) => {
      //     const storageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      //     await uploadBytes(storageRef, image);
      //     return await getDownloadURL(storageRef);
      //   })
      // );

      // For now, convert images to base64 (not recommended for production)
      // In production, use Firebase Storage URLs
      const imageUrls = await Promise.all(
        images.map((image) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(image);
          });
        })
      );

      // Combine existing preview URLs (from editing) with new uploads
      const existingUrls = imagePreviews.filter((url) => !url.startsWith("blob:"));
      const allImageUrls = [...existingUrls, ...imageUrls];

      const postData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        price: parseFloat(formData.price),
        contactEmail: formData.contactEmail.trim(),
        images: allImageUrls,
        ownerEmail: user?.email || "",
        ownerName: user?.displayName || user?.email || "",
      };

      if (editingPost) {
        // TODO: Update post in Firestore
        // Example: await updateDoc(doc(db, 'posts', editingPost), postData);
        
        await updatePost(editingPost, postData);
        setSuccessMessage("Post updated successfully!");
      } else {
        // TODO: Save post to Firestore
        // Example: await addDoc(collection(db, 'posts'), {
        //   ...postData,
        //   createdAt: serverTimestamp(),
        //   userId: currentUser.uid
        // });
        
        await createPost(postData);
        setSuccessMessage("Post created successfully!");
      }

      // Clear form and show success message
      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        contactEmail: "",
      });
      
      // Clear images and revoke URLs
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      setImages([]);
      setImagePreviews([]);
      setErrors({});
      setEditingPost(null);
      setShowSuccessAlert(true);
      await loadPosts(); // Reload posts
    } catch (error) {
      console.error("Error saving post:", error);
      setSuccessMessage("Error saving post. Please try again.");
      setShowSuccessAlert(true);
      setSubmitError(error?.message || "Failed to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setSuccessMessage("Post deleted successfully!");
        setShowSuccessAlert(true);
        await loadPosts(); // Reload posts
      } catch (error) {
        console.error("Error deleting post:", error);
        setSuccessMessage("Error deleting post. Please try again.");
        setShowSuccessAlert(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="mb-6 animate-slide-up">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center text-black p-4 rounded-lg hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            My Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Create and manage your property listings
          </p>
        </div>

        {/* Create/Edit Post Form Card */}
        <div className="bg-[var(--surface-soft)] rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-semibold text-gray-800">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
          </div>
          <div className="p-6">
            {!user ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600 mb-6">You must be logged in to post properties</p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Go to Login
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Property Title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Describe the property"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Property address"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Price and Contact Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.contactEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="info@example.com"
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images <span className="text-gray-500 text-xs">(Optional, max 10)</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG & JPG up to 5MB each
                    </p>
                  </label>
                </div>
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                )}

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                {editingPost && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-150"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting || !user}
                  className={`${editingPost ? 'flex-1' : 'w-full'} flex justify-center items-center px-6 py-3 ${submitting || !user ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 shadow-md hover:shadow-lg`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {editingPost ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    )}
                  </svg>
                  {submitting ? "Saving..." : (editingPost ? "Update Post" : (user ? "Create Post" : "Sign in to post"))}
                </button>
                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
              </div>
            </form>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="bg-[var(--surface-soft)] rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                 Posts List
              </h2>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-md">
                {posts.length} {posts.length === 1 ? "Post" : "Posts"}
              </span>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Posts Yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Create your first post to get started!
              </p>
            </div>
          ) : (
            <div className="p-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[var(--surface-soft)] border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
                  >
                    {/* Image Gallery */}
                    {post.images && post.images.length > 0 && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        {post.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                            +{post.images.length - 1} more
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-5 flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {post.title}
                          </h3>
                          {post.price && (
                            <p className="text-xl font-bold text-blue-600">
                              ${post.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0"
                            title="Edit post"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-800 transition-colors flex-shrink-0"
                            title="Delete post"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {post.location && (
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {post.location}
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {post.description}
                      </p>
                      
                      {post.contactEmail && (
                        <div className="mb-3">
                          <a
                            href={`mailto:${post.contactEmail}`}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Contact: {post.contactEmail}
                          </a>
                        </div>
                      )}
                      
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          Created: {post.timestamp}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;