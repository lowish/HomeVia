import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const OurGuide = () => {
  const navigate = useNavigate();

  // Bidirectional animations for service section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  // Alternating card animations: left slide and right slide
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -50 }, // Slide from left
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 50 }, // Slide from right
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const handleStartBrowsing = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      id="service"
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--bg-soft)] to-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }} // Trigger on scroll down and up
      variants={sectionVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-blue-900 mb-4">
            Our Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to buy or sell, this platform makes the process simple and transparent. Here's how to get started.
          </p>
        </div>

        {/* Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Home Buying Card */}
          <motion.div
            variants={cardVariantsLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
            className="bg-[var(--surface-soft)] rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4V8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Looking to Buy?</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mr-3 flex-shrink-0">1</span>
                <p className="text-gray-700">Browse featured properties and property listings to find homes that match your needs</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mr-3 flex-shrink-0">2</span>
                <p className="text-gray-700">View detailed property information, images, and seller contact details</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mr-3 flex-shrink-0">3</span>
                <p className="text-gray-700">Book an appointment or contact the seller directly to schedule a viewing</p>
              </div>
            </div>

            <button
              onClick={handleStartBrowsing}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Get Booking
            </button>
          </motion.div>

          {/* Home Selling Card */}
          <motion.div
            variants={cardVariantsRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
            className="bg-[var(--surface-soft)] rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Sell?</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold mr-3 flex-shrink-0">1</span>
                <p className="text-gray-700">Sign up or log in to your user dashboard to access your account</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold mr-3 flex-shrink-0">2</span>
                <p className="text-gray-700">Create a new post with property details, images, and pricing information</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold mr-3 flex-shrink-0">3</span>
                <p className="text-gray-700">Manage appointments and inquiries from interested buyers in real-time</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurGuide;