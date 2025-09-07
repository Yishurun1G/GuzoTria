import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import AboutUs from './pages/AboutUs.jsx';
import Blog from './pages/Blog.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Home from './pages/Home.jsx';
import Location from './pages/Location.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Scooters from './pages/Scooters.jsx';
import Signup from './pages/Signup.jsx';
// import Login from './pages/Login.jsx';
import MyLogin from './pages/MyLogin.jsx';

import Dashboard from './pages/user/UserDashboard.jsx';
import MyRide from './pages/user/MyRide.jsx';
import Profile from './pages/user/Profile.jsx';
import Payment from './pages/user/Payment.jsx';

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
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<MyLogin />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Protected Routes */}
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/my-ride"
          element={
            <ProtectedRoute>
              <MyRide />
            </ProtectedRoute>
          }
        />
        <Route path="/payments"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/payment" element={<Payment />} />  */}
      </Routes>
    </BrowserRouter>
  );
}