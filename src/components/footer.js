import React from "react";
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <nav className="mx-0 my-0 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
          <div className="px-5 py-2">
            <div className="text-xl text-white font-bold hover:text-gray-300 cursor-pointer">
              HomeVia
            </div>
          </div>
          
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-lg font-semibold mb-5">About Us</h3>
            <p className="text-white mb-2">HomeVia is a personal project built to help you explore houses for sale across the Philippines. Compare options and book viewing appointments directly so owners and interested clients can connect faster.</p>
          
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-2 gap-4 md:gap-4 items-start">
              <div>
                <h3 className="text-white text-lg font-semibold mb-5">Quick Links</h3>
                <ul className="flex flex-col sm:flex-row md:flex-wrap items-start sm:items-center gap-3 md:gap-2">
                  <li>
                    <Link
                      to="home"
                      smooth={true}
                      offset={-70}
                      className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="about"
                      smooth={true}
                      offset={-70}
                      className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="feature"
                      smooth={true}
                      offset={-70}
                      className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                     Our Features
                    </Link>
                  </li>
                   <li className="py-2">
                    <Link
                      to="service"
                      smooth={true}
                      offset={-70}
                      className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                      Learn More
                    </Link>
                  </li>
                   <li className="py-2">
                    <Link
                      to="client"
                      smooth={true}
                      offset={-70}
                      className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                      Reviews
                    </Link> 
                  </li>
                  <li className="py-2">
                    <Link
                      to="posts"
                      smooth={true}
                      offset={-70}
                      className="text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                      Post Listing
                    </Link> 
                  </li>
                                 
                </ul>
              </div>

              <div className="sm:justify-self-end">
                <div className="flex flex-col mb-2">
                    <p className="text-white text-sm">Developed by <a href="https://github.com/lowish" className="hover:text-gray-400">lowish</a></p>
                </div>   
                <h3 className="text-white text-lg font-semibold mb-3">Connect with me</h3>
                <div className="flex items-center gap-6 md:gap-7">
                  <a href="https://www.linkedin.com/in/pwtandev/" aria-label="LinkedIn" className="text-white hover:text-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/lowish" aria-label="GitHub" className="text-white hover:text-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.92 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0 0 12 .5z"/>
                    </svg>
                  </a>     
                </div>
              </div>
            </div>
          </div>             
          </div>
       
        <div className="mt-8 flex justify-center">
          <p className="text-white">&copy; {new Date().getFullYear()} Real Estate Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;