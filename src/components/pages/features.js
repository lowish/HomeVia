import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "../../assets/Ayala.jpg";
import Imagee from "../../assets/Ayala1.jpg";
import Imageee from "../../assets/Ayala2.jpg";
import Imageeee from "../../assets/Forbes.jpg";
import Imageeeee from "../../assets/Forbes1.jpg";
import Imageeeeee from "../../assets/Forbes2.jpg";
import Imageeeeeee from "../../assets/Camella.jpg";
import Imageeeeeeee from "../../assets/Camella1.jpg";
import Imageeeeeeeee from "../../assets/Camella2.jpg";


const Features = () => {
  // Bidirectional section animation (slide up from bottom)
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  // Bidirectional card animation (alternating left/right slides)
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  // Simple image viewer modal state (same pattern as postsList)
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(0);

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

  const propertyCards = [
    {
      id: 1,
      image: Image,
      title: "Ayala Alabang - Muntinlupa City",
      specs: "3 bedroom | 2 bathroom | 1,000 sqft",
      price: "₱30,000,000",
      images: [Image, Imagee, Imageee],
    },
    {
      id: 2,
      image: Imageeee,
      title: "Forbes Park - Makati City",
      specs: "4 bedroom | 3 bathroom | 1,500 sqft",
      price: "₱20,000,000",
      images: [Imageeee, Imageeeee, Imageeeeee],
    },
    {
      id: 3,
      image: Imageeeeeee,
      title: "Camella Homes - Angeles City",
      specs: "2 bedroom | 1 bathroom | 800 sqft",
      price: "₱3,000,000",
      images: [Imageeeeeee, Imageeeeeeee, Imageeeeeeeee],
    },
    {
      id: 4,
      image: Imagee,
      title: "Modern Luxury Condo",
      specs: "Prime location with stunning city views",
      price: "₱2,500,000",
      images: [Imagee, Imageee, Imageeee],
    },
    {
      id: 5,
      image: Imageee,
      title: "Beachfront Villa",
      specs: "Exclusive waterfront property with private beach",
      price: "₱5,000,000",
      images: [Imageee, Imagee, Imageeee],
    },
    {
      id: 6,
      image: Imageeee,
      title: "Suburban Family Home",
      specs: "Spacious home perfect for families",
      price: "₱1,800,000",
      images: [Imageeee, Imagee, Imageee],
    },
  ];

  const PropertyCard = ({ card }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
      className='shadow-md shadow-[#040c16] hover:scale-110 duration-500 flex-shrink-0 w-full md:w-auto'
    >
      <div className="bg-[var(--surface-soft)] rounded-lg shadow-lg border border-gray-200 h-full flex flex-col">
        <img src={card.image} alt={card.title} className="w-full h-48 md:h-64 object-cover rounded-t-lg" />
        <div className="py-6 px-4 flex-1 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{card.specs}</p>
          <p className="text-lg font-bold text-gray-700 mb-auto">{card.price}</p>
          <button
            onClick={() => openImageViewer(card.images, 0)}
            className="mt-6 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      id="feature"
      className="w-full min-h-screen p-2 flex items-center bg-gradient-to-b from-[var(--bg-surfacesoft)] to-gray-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }} // Trigger on scroll down and up
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">Featured <span className="text-blue-800">Properties</span></h2>
        <p className="text-lg text-gray-700 mb-8">Here are some of available properties:</p>
        
        {/* Responsive Grid */}
        <div className="md:overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
            {propertyCards.map((card) => (
              <PropertyCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {viewerOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={(e) => { if (e.target === e.currentTarget) closeImageViewer(); }}
          >
            <div className="bg-[var(--surface-soft)] rounded-lg max-w-3xl w-full p-6 relative border border-gray-200">
              <button
                onClick={closeImageViewer}
                className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition"
                aria-label="Close"
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
    </motion.div>
  );
};

export default Features;