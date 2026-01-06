import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import UserHome from "./components/pages/userHome";
import Features from "./components/pages/features";
import About from "./components/pages/about";
import Client from "./components/pages/clients";
import Service from "./components/pages/service";
import Contact from "./components/pages/contact";
import PostsList from "./components/pages/postsList";
import PublicListings from "./components/pages/publicListings";
import Login from "./components/pages/login";
import UserDashboard from "./components/pages/userDashboard";
import './index.css'

function AppContent() {
  const location = useLocation();
  
  // Handle section scrolling based on URL hash
  useEffect(() => {
    // Get the hash from the actual browser URL
    const fullHash = window.location.hash; // e.g., "#/" or "#!/#about"
    
    // Check if there's a section anchor after the route
    // Format: #!/#about for HashRouter
    const sectionMatch = fullHash.match(/#\/#(.+)$/);
    
    if (sectionMatch && sectionMatch[1]) {
      const sectionId = sectionMatch[1];
      
      // Delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    } else if (location.pathname === "/") {
      // If we're on home page and no section, scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const isLoginRoute = location.pathname === "/login";
  const isDashboardRoute = location.pathname === "/userDashboard";
  const isListingsRoute = location.pathname === "/publicListings";
  const hideNavbarFooter = isLoginRoute || isDashboardRoute || isListingsRoute;

  return (
    <div className="bg-[var(--bg-soft)] text-gray-900 min-h-screen">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <UserHome />
            <About />
            <Features />  
            <PostsList />  
            <Service />
            <Client />
            <Contact />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/publicListings" element={<PublicListings />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;












