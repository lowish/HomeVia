import React from "react";
import { motion } from "framer-motion";
import Client from "../../assets/Client.png";

const OurClients = () => {
  // Bidirectional animations for client testimonials
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  // Staggered card animations: pop up effect
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      id="client"
      className="w-full min-h-screen items-start flex items-center bg-[var(--bg-soft)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }} // Trigger on scroll down and up
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Clients</h2>
          <p className="text-lg text-gray-700 mb-8">
            See what our clients have to say about us.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
         
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
          className="justify-center"
        >
        <img
          className="w-24 h-24 object-cover rounded-full"
          src={Client}
          alt="Client 1"
        />
        <div className="z-10 bg-[var(--surface-soft)] p-8 rounded-lg shadow-md border border-gray-200">
          <p className="text-lg text-gray-700 mb-4">
            "As a homebuyer, I can browse verified listings, compare details, and book viewing appointments in a couple of clicks. Everything feels transparent and well-organized."
          </p>
          <p className="text-gray-500">Adam Johnson, Homebuyer</p>
        </div>
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
        className="justify-center"
      >
      <img
        className="w-24 h-24 object-cover rounded-full"
        src={Client}
        alt="Client 1"
      />
      <div className="z-10 bg-[var(--surface-soft)] p-8 rounded-lg shadow-md border border-gray-200">
        <p className="text-lg text-gray-700 mb-4">
          "As a home seller, posting my property was simple, and the dashboard keeps every inquiry in one place. Appointment requests land instantly so I can respond fast."
        </p>
        <p className="text-gray-500">Michael Smith, Home Seller</p>
      </div>
    </motion.div>
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
      className="justify-center"
    >
    <img
      className="w-24 h-24 object-cover rounded-full"
      src={Client}
      alt="Client 1"
    />
    <div className="z-10 bg-[var(--surface-soft)] p-8 rounded-lg shadow-md border border-gray-200">
      <p className="text-lg text-gray-700 mb-4">
        "Booking and confirming viewings is effortless, and reminders keep everyone on schedule. It’s the smoothest appointment experience I’ve had with real estate."
      </p>
      <p className="text-gray-500">David Brown, Buyer & Seller</p>
    </div>
  </motion.div>
  </div>
  </div>
</motion.div>
  );
};

export default OurClients;
















