import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // signin | signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        if (!formData.email || !formData.password || !formData.displayName) {
          throw new Error("Please fill in name, email and password.");
        }
        const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(cred.user, { displayName: formData.displayName });
        navigate("/userDashboard");
      } else {
        if (!formData.email || !formData.password) {
          throw new Error("Please enter email and password.");
        }
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate("/userDashboard");
      }
    } catch (err) {
      setError(err?.message || "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center text-black p-2 rounded-lg hover:text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-[var(--surface-soft)] rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {mode === "signup" ? "Create Account" : "Sign In"}
            </h2>
            <p className="mt-2 text-center text-gray-600">
              {mode === "signup" ? "Register to post properties" : "Sign in to post properties"}
            </p>
          </div>

          <div className="px-6 py-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full flex justify-center items-center px-4 py-3 ${submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 shadow-md hover:shadow-lg`}
                >
                  {submitting ? (mode === 'signup' ? 'Creating...' : 'Signing in...') : (mode === 'signup' ? 'Create Account' : 'Sign In')}
                </button>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {mode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-md text-sm text-red-800">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

