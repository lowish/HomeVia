import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
  const isLoginRoute = location.pathname === "/login";
  const isDashboardRoute = location.pathname === "/dashboard";
  const isListingsRoute = location.pathname === "/listings";
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
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/listings" element={<PublicListings />} />
        {/* Admin route removed; use login + dashboard for users */}
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












