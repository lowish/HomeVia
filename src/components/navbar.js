import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import '../index.css'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);


  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowProfileDropdown(false);
      setShowMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handle hash changes when user clicks on scroll links
  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    // Update the URL hash for HashRouter compatibility (format: #!/#sectionId)
    window.location.hash = `/#${sectionId}`;
    
    // Scroll to element using scrollIntoView (works with CSS scroll-margin-top)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 33) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle initial hash on page load
  useEffect(() => {
    // Extract section from HashRouter format: #!/#about -> about
    const fullHash = window.location.hash;
    const sectionMatch = fullHash.match(/#\/#(.+)$/);
    
    if (sectionMatch && sectionMatch[1]) {
      const sectionId = sectionMatch[1];
      // Delay to ensure the page and all sections have fully rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  }, []);

  // Handle browser back/forward button navigation
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash;
      const sectionMatch = fullHash.match(/#\/#(.+)$/);
      
      if (sectionMatch && sectionMatch[1]) {
        const element = document.getElementById(sectionMatch[1]);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <div className={`fixed top-0 z-50 w-full h-[70px] flex justify-between items-center px-4 text-black ${isScrolled ? "bg-[var(--bg-soft)] shadow-sm" : "bg-transparent"} relative`}>
      <div className="text-4xl cursor-pointer inline-flex items-center text-blue-800 font-bold">
        <button 
          onClick={() => handleSectionClick('home')}
          className="text-blue-800 hover:text-blue-600 transition-colors no-underline bg-transparent border-0 cursor-pointer text-4xl font-bold"
        >
          HomeVia
        </button>
      </div>
      <button
        type="button"
        onClick={handleMenuClick}
        aria-label={showMenu ? 'Close menu' : 'Open menu'}
        aria-expanded={showMenu}
        className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 ${isScrolled ? 'bg-white/95 shadow-sm' : 'bg-white/80 backdrop-blur'} text-blue-900 transition z-10 ml-auto`}
      >
        {showMenu ? (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.95 5.879l-1.414-1.414L10 8.586 6.464 5.05 5.05 6.464 8.586 10l-3.536 3.536 1.414 1.414L10 11.414l3.536 3.536 1.414-1.414L11.414 10l3.536-3.536z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <ul className="hidden md:flex">
        <li>
          <button 
            onClick={() => handleSectionClick('home')}
            className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-0"
          >
            Home
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleSectionClick('about')}
            className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-0"
          >
            About Us
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleSectionClick('feature')}
            className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-0"
          >
            Our Features
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleSectionClick('service')}
            className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-0"
          >
            Learn More
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleSectionClick('client')}
            className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-0"
          >
            Reviews
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleSectionClick('posts')}
            className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-0"
          >
            Post Listing
          </button>
        </li>
      
      </ul>
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="relative profile-dropdown-container">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>
              <span className="text-gray-800 font-medium max-w-[120px] truncate">
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </span>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    navigate('/userDashboard');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <RouterLink
            to="/login"
            className="px-6 py-2.5 sm:py-3 cursor-pointer bg-blue-800 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl rounded-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 font-medium text-sm sm:text-base"
          >
            Login
          </RouterLink>
        )}
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {showMenu && (
      <div className="md:hidden fixed top-[70px] left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 animate-slide-down">
        <div className="px-4 py-3">
          {user ? (
            <>
              {/* User Profile Info */}
              <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-3">
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('home');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('about');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  About Us
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('feature');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Our Features
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('service');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Learn More
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('client');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Reviews
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('posts');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Post Listing
                </button>
              </div>

              <hr className="my-3 border-gray-200" />

              {/* Dashboard and Logout */}
              <button
                onClick={() => {
                  navigate('/userDashboard');
                  setShowMenu(false);
                }}
                className="w-full py-3 px-4 text-left text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3 transition-colors mb-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 text-left text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Mobile Navigation Links for non-logged in users */}
              <div className="space-y-2 mb-3">
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('home');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('about');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  About Us
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('feature');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Our Features
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('service');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Learn More
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('client');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Reviews
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    handleSectionClick('posts');
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded-md px-3 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Post Listing
                </button>
              </div>

              <hr className="my-3 border-gray-200" />

              {/* Login Button */}
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMenu(false);
                }}
                className="w-full py-3 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg active:bg-blue-900 transition-all transform active:scale-95 flex items-center justify-center gap-2 font-medium text-base shadow-md"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;