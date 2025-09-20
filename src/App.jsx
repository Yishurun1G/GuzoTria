import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import AboutUs from './pages/AboutUs.jsx';
import Blog from './pages/Blog.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Home from './pages/Home.jsx';
import Location from './pages/Location.jsx';
// import Login from './pages/Login.jsx';
import MyLogin from './pages/MyLogin.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Scooters from './pages/Scooters.jsx';
import Signup from './pages/Signup.jsx';
// Protected Route
import ProtectedRoute from './components/ProtectedRoute.jsx';

// User Pages
import Dashboard from './pages/user/UserDashboard.jsx';
import MyRide from './pages/user/MyRide.jsx';
import Profile from './pages/user/Profile.jsx';
import Payment from './pages/user/Payment.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminScooters from './pages/admin/AdminScooter.jsx';
import AdminUserAndPartner from './pages/admin/AdminUserAndPartner.jsx';
import AdminLocations from './pages/admin/AdminLocations.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================ Public Routes ============================ */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/location" element={<Location />} />
        <Route path="/scooters" element={<Scooters />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<MyLogin />} />
        <Route path="*" element={<PageNotFound />} />

        {/* ============================ Protected Routes USER ============================ */}
        <Route element={<ProtectedRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/my-ride' element={<MyRide />} />
          <Route path='/payments' element={<Payment />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* ============================ Protected Routes ADMIN ============================ */}
        <Route element={<ProtectedRoute requireAdmin={true} />} >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/scooters" element={<AdminScooters />} />
          <Route path="/admin/users" element={<AdminUserAndPartner />} />
          <Route path="/admin/locations" element={<AdminLocations />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}