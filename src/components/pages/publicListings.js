import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getAllPublicPosts, subscribeToPublicPosts } from "../../services/postsService";

const PublicListings = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track auth state
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubAuth();
  }, []);

  // Load all public posts
  useEffect(() => {
    loadPublicPosts();
    
    // Real-time subscription to all posts
    const unsubscribe = subscribeToPublicPosts(
      (updatedPosts) => {
        setPosts(updatedPosts);
        setLoading(false);
      },
      (err) => {
        console.error("public posts subscription error", err);
        setError(err?.message || "Failed to load listings");
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loadPublicPosts = async () => {
    try {
      const allPosts = await getAllPublicPosts();
      setPosts(allPosts);
      setLoading(false);
    } catch (err) {
      console.error("loadPublicPosts error", err);
      setError(err?.message || "Failed to load listings");
      setLoading(false);
    }
  };

  const isOwner = (post) => {
    return user && post.userId === user.uid;
  };

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { opacity: 0, y: -20 }
  };

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Scroll-triggered animation: fade-in + slide-up when entering viewport (bidirectional)
  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Start 30px below, invisible
    visible: { 
      opacity: 1, 
      y: 0, // Slide up to original position
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-7xl mx-auto">
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
            All Property Listings
          </h1>
          <p className="text-lg text-gray-600">
            Browse properties from all users
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Posts Grid */}
        <div className="bg-[var(--surface-soft)] rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-semibold text-gray-800">
              Available Properties ({posts.length})
            </h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  No listings yet
                </h3>
                <p className="mt-2 text-gray-600">
                  Be the first to post a property!
                </p>
                {!user && (
                  <button
                    onClick={() => navigate("/login")}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Login to Post
                  </button>
                )}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // Trigger when container enters viewport
                viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
              >
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                  >
                    {/* Image Section */}
                    {post.images && post.images.length > 0 && (
                      <div className="relative h-48 bg-gray-200">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        {post.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            +{post.images.length - 1} more
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                          {post.title}
                        </h3>
                        {isOwner(post) && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            Your Post
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-semibold text-lg">
                            ₱{post.price?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm">{post.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>Posted by: {post.ownerName || "User"}</span>
                        <span>{post.timestamp}</span>
                      </div>

                      {/* Contact Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <motion.a
                          href={`mailto:${post.contactEmail}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Contact Owner
                        </motion.a>
                      </div>

                      {/* Edit/Delete only for owner */}
                      {isOwner(post) && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                          >
                            Manage in Dashboard
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Call to Action for non-logged-in users */}
        {!user && posts.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Want to post your property?
            </h3>
            <p className="text-gray-600 mb-4">
              Sign in to create and manage your own property listings
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Login / Sign Up
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PublicListings;
