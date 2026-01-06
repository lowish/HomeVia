import React from "react";
import { motion } from "framer-motion";
import Image from "../../assets/About.jpg";

const AboutUs = () => {
  // Bidirectional animation: triggers when scrolling down or up
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Slide from left
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 }, // Slide from right
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="w-full py-16 md:py-20 bg-gray-50"
      style={{ scrollMarginTop: '70px' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }} // Trigger on scroll down and up
      variants={contentVariants}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image */}
          <motion.div 
            className="w-full md:w-2/5 flex-shrink-0"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src={Image}
              alt="About HomeVia"
              className="w-full h-auto max-h-80 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Content */}
          <motion.div 
            className="w-full md:w-3/5"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-4xl font-bold text-blue-800 mb-6">
              About Us
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                Welcome to <span className="font-semibold text-blue-800">HomeVia</span>, a personal project platform designed to help you explore residential homes across the Philippines.
              </p>
              <p className="text-base md:text-lg">
                Our platform is dedicated to helping you explore and find quality houses that suit your lifestyle and housing needs.
              </p>
              <p className="text-base md:text-lg">
                This platform enables users to book property viewing appointments directly, making the process more convenient and efficient for both homeowners and interested clients.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
