import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  // Initialize EmailJS (add your public key)
  React.useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.log("FAILED...", error.text);
        }
      );
  };

  // Bidirectional section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  // Form card animation with slight delay
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };

  return (
    <motion.div
      id="contact"
      className="w-full min-h-screen bg-gradient-to-br from-[var(--bg-soft)] to-gray-200 py-16 px-4 sm:px-6 lg:px-8 flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }} // Trigger on scroll down and up
      variants={sectionVariants}
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-3xl font-bold text-gray-900 mb-3">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about a house listing or need to adjust your viewing booking? Reach out and we’ll help right away.
          </p>
        </div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }} // Trigger on scroll down and up
          className="bg-[var(--surface-soft)] rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900">Send us a message</h3>
          </div>

          <div className="px-6 py-8">
            <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                   Full Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  autoComplete="given-name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              {status && (
                <div className={`p-3 rounded-lg text-center ${status.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {status}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={status === "Sending..."}
                >
                  {status === "Sending..." ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUs;