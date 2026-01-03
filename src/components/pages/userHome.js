import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import Image from "../../assets/main.jpg";

const UserHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    house: "",
    preferredDate: "",
    preferredTime: "",
    consent: false,
  });


  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (
      formData.fullName &&
      formData.email &&
      formData.address &&
      formData.house &&
      formData.preferredDate &&
      formData.preferredTime &&
      formData.consent
    ) {
      setSubmitting(true);
      try {
        // Prepare payload; include userId only when signed in
        const payload = {
          ...formData,
          status: "pending",
          createdAt: serverTimestamp(),
        };

        if (auth?.currentUser?.uid) {
          payload.userId = auth.currentUser.uid;
        }

        // Create Firestore document under "appointments"
        await addDoc(collection(db, "appointments"), payload);

        // Clear form and show success message
        setFormData({
          fullName: "",
          email: "",
          address: "",
          house: "",
          preferredDate: "",
          preferredTime: "",
          consent: false,
        });
        setIsModalOpen(false);
        setShowSuccess(true);
      } catch (err) {
        setSubmitError(err?.message || "Failed to book appointment. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Hero Section */}
      <div id="home" className="w-full min-h-screen p-8 flex items-center bg-surface-100">
        <div className="max-w-7xl mx-auto md:flex md:flex-row-reverse md:items-center">
          <div className="md:w-1/2 md:pr-8 my-6 md:my-0 md:-mt-12">
            <img
              src={Image}
              alt="Home"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Find The Perfect<span className="text-gray-800"> Place To Live</span>
              </h1>
              <p className="text-lg text-gray-700 mb-9">
                Welcome to real estate platform. This website showcases different properties 
                in the Philippines to help you explore a wide range of properties and discover 
                the perfect place to live.
              </p>
              <div className="text-center md:text-left">
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.button 
                    onClick={openModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-blue-800 text-white shadow-lg hover:bg-blue-700 rounded-md transition-all"
                  >
                    Book Appointment
                  </motion.button>
                  <motion.button 
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-gray-900 text-white shadow-lg hover:bg-gray-800 rounded-md transition-all"
                  >
                    Contact Us
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--surface-soft)] rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                  />
                </div>

                <div>
                  <label htmlFor="house" className="block text-sm font-medium text-gray-700 mb-1">
                    House Selection
                  </label>
                  <select
                    id="house"
                    name="house"
                    value={formData.house}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select a house</option>
                    <option value="Ayala Residences">Ayala Residences</option>
                    <option value="Forbes Park Villa">Forbes Park Villa</option>
                    <option value="Modern Condo Unit">Modern Condo Unit</option>
                    <option value="Luxury Penthouse">Luxury Penthouse</option>
                    <option value="Family Home">Family Home</option>
                    <option value="Beachfront Property">Beachfront Property</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Appointment time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="consent" className="font-medium text-gray-700">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // You can add a modal or navigate to terms page here
                          alert("Terms & Privacy Policy page would open here");
                        }}
                      >
                        Terms and Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className={`flex-1 px-4 py-2 rounded-md text-white transition-colors ${submitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-900"}`}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </motion.button>
                </div>
                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-semibold">Appointment Booked Successfully!</p>
              <p className="text-sm">We'll contact you soon to confirm your viewing.</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};

export default UserHome;
