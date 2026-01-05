import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllPublicPosts, subscribeToPublicPosts } from "../../services/postsService";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    // Load all public posts initially
    loadPosts();

    // Subscribe to all public posts updates for real-time functionality
    const unsubscribe = subscribeToPublicPosts((updatedPosts) => {
      setPosts(updatedPosts);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loadPosts = async () => {
    const allPosts = await getAllPublicPosts();
    setPosts(allPosts);
  };

  const openImageViewer = (images = [], startIndex = 0) => {
    if (!images || images.length === 0) return;
    setViewerImages(images);
    setViewerIndex(Math.max(0, Math.min(startIndex, images.length - 1)));
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
    setViewerImages([]);
    setViewerIndex(0);
  };

  const nextImage = () => {
    setViewerIndex((i) => (i + 1) % viewerImages.length);
  };

  const prevImage = () => {
    setViewerIndex((i) => (i - 1 + viewerImages.length) % viewerImages.length);
  };

  // Animation variants for stagger effect with bidirectional trigger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Increased stagger for slower effect
      }
    }
  };

  // Bidirectional animation: pop up effect (fade-in + slide-up)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 // Start 30px below
    },
    visible: { 
      opacity: 1, 
      y: 0, // Slide to original position
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };


  return (
    // This section wraps for not posting a listing
    <div id="posts" className="w-full min-h-screen bg-[var(--bg-soft)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Property <span className="text-blue-800">Listings</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse all available property listings from our community
          </p>
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Posting Yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Go to login button to post a listing!
            </p>
          </div>


        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
            initial="hidden"
            whileInView="visible" // Container animates when entering viewport
            viewport={{ once: false, margin: "-100px" }} // Trigger on scroll down and up
            variants={containerVariants}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible" // Trigger animation when card enters viewport
                viewport={{ once: false }} // Animate on scroll down and up
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--surface-soft)] border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {/* Image Gallery */}
                {post.images && post.images.length > 0 && (
                  <div className="relative h-64 overflow-hidden">
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
                    <motion.button
                      onClick={() => openImageViewer(post.images, 0)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-2 right-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </motion.button>
                  </div>
                )}
                
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  
                  {post.price && (
                    <p className="text-2xl font-bold text-blue-600 mb-3">
                      ₱{post.price.toLocaleString()}
                    </p>
                  )}
                  
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
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  {post.contactEmail && (
                    <div className="mb-4">
                      <a
                        href={`mailto:${post.contactEmail}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Contact Seller →
                      </a>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Posted: {post.timestamp}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {viewerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeImageViewer();
          }}
        >
          <div className="relative bg-[var(--surface-soft)] rounded-lg shadow-lg max-w-3xl w-full p-4 border border-gray-200">
            <button
              aria-label="Close"
              onClick={closeImageViewer}
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition"
            >
              ✕
            </button>
            <div className="relative">
              <img
                src={viewerImages[viewerIndex]}
                alt={`image-${viewerIndex + 1}`}
                className="w-full h-[24rem] object-cover rounded"
              />
              <button
                aria-label="Previous"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded"
              >
                ›
              </button>
              <div className="mt-3 text-center text-sm text-gray-600">
                {viewerIndex + 1} / {viewerImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;

