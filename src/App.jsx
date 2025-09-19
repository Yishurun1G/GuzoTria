import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import AboutUs from './pages/AboutUs.jsx';
import Blog from './pages/Blog.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Home from './pages/Home.jsx';
import Location from './pages/Location.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Scooters from './pages/Scooters.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

// User Pages
import Dashboard from './pages/user/UserDashboard.jsx';
import MyRide from './pages/user/MyRide.jsx';
import Profile from './pages/user/Profile.jsx';
import Payment from './pages/user/Payment.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdvertisementManagement from './pages/admin/AdvertisementManagement.jsx';
import BookingAndTransactions from './pages/admin/BookingsAndTransactions.jsx';
import DiscountsAndPromotions from './pages/admin/DiscountsAndPromotions.jsx';
import ScooterManagement from './pages/admin/ScooterManagement.jsx';
import UserAndPartnerManagement from './pages/admin/UserAndPartnerManagement.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/location" element={<Location />} />
        <Route path="/scooters" element={<Scooters />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Protected Routes USER */}        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-ride" element={<MyRide />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} /> 

        {/* Protected Routes ADMIN */}
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/advertisement-management' element={<AdvertisementManagement />} />
        <Route path='/bookings-and-transactions' element={<BookingAndTransactions />} />
        <Route path='/discounts-and-promotions' element={<DiscountsAndPromotions />} />
        <Route path='/scooter-management' element={<ScooterManagement />} />
        <Route path='/user-and-partner-management' element={<UserAndPartnerManagement />} />
      </Routes>
    </BrowserRouter>
  );
}