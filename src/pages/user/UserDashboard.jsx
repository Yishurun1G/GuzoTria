import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { mockUserData, mockNotifications, mockAvailableScooters } from "../../api/MockUserData";
import { 
  FaBicycle, 
  FaBell, 
  FaMapMarkerAlt, 
  FaBatteryFull, 
  FaClock, 
  FaDollarSign,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa";

export default function UserDashboard() {
  const [userData] = useState(mockUserData);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [availableScooters] = useState(mockAvailableScooters);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "promotion":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "payment":
        return <FaCheckCircle className="text-green-500" />;
      case "update":
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen bg-white pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome back, {userData.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Ready for your next adventure? Let's find you a perfect ride.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Rides</p>
                  <p className="text-3xl font-bold">{userData.totalRides}</p>
                </div>
                <FaBicycle className="text-4xl text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Distance Covered</p>
                  <p className="text-3xl font-bold">{userData.totalDistance} km</p>
                </div>
                <FaMapMarkerAlt className="text-4xl text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Money Saved</p>
                  <p className="text-3xl font-bold">${userData.totalSaved}</p>
                </div>
                <FaDollarSign className="text-4xl text-purple-200" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/location" className="group">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Book a Ride</h3>
                      <p className="text-orange-200">Find and book nearby scooters</p>
                    </div>
                    <FaChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              
              <Link to="/my-ride" className="group">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">My Rides</h3>
                      <p className="text-teal-200">View ride history and receipts</p>
                    </div>
                    <FaChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              
              <Link to="/payments" className="group">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Payments</h3>
                      <p className="text-indigo-200">Manage payments and billing</p>
                    </div>
                    <FaChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg transition-colors"
              >
                <FaBell className="text-xl" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>
            
            {showNotifications && (
              <div className="bg-gray-100 rounded-xl p-6 space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg ${
                      notification.isRead ? 'bg-white' : 'bg-blue-100'
                    }`}
                  >
                    <div className="text-xl mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-2">{notification.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Scooters Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Available Scooters Near You</h2>
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "list" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "map" 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Map View
                </button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableScooters.map((scooter) => (
                  <div key={scooter.id} className="bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-colors border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{scooter.name}</h3>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {scooter.partner}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span className="text-sm">{scooter.location} ({scooter.distance}km away)</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaBatteryFull className={`${scooter.battery > 70 ? 'text-green-500' : scooter.battery > 40 ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="text-sm">{scooter.battery}% battery - {scooter.range}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaDollarSign className="text-green-500" />
                        <span className="text-sm">${scooter.pricePerMin}/min</span>
                      </div>
                    </div>
                    
                    <Link to="/location">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                        Book This Scooter
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-xl p-8 text-center border border-gray-200">
                <FaMapMarkerAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Map View Coming Soon</h3>
                <p className="text-gray-600">Interactive map with real-time scooter locations will be available soon.</p>
                <button
                  onClick={() => setViewMode("list")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Switch to List View
                </button>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-gray-600">Our chatbot is available 24/7 to assist you with any questions.</p>
              </div>
              <Link to="/chatbot">
                <Button
                  name="Chat with Support"
                  type="primary"
                  textSize="text-lg"
                  padding="py-3 px-6"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}   