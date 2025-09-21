import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { mockRides } from "../../api/MockUserData";
import { 
  FaBicycle, 
  FaMapMarkerAlt, 
  FaClock, 
  FaDollarSign,
  FaDownload,
  FaStar,
  FaFilter,
  FaCalendarAlt,
  FaRoute,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaEdit,
  FaThumbsUp,
  FaThumbsDown
} from "react-icons/fa";

export default function MyRide() {
  const [rides, setRides] = useState(mockRides);
  const [filteredRides, setFilteredRides] = useState(mockRides);
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    let filtered = rides;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(ride => ride.status === filterType);
    }

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(ride => {
        const rideDate = new Date(ride.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return rideDate >= startDate && rideDate <= endDate;
      });
    }

    setFilteredRides(filtered);
  }, [rides, filterType, dateRange]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "upcoming":
        return <FaExclamationCircle className="text-yellow-500" />;
      case "cancelled":
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const handleRateRide = (rideId, rating) => {
    setRides(prev => 
      prev.map(ride => 
        ride.id === rideId ? { ...ride, rating } : ride
      )
    );
  };

  const openReviewModal = (ride) => {
    setSelectedRide(ride);
    setCurrentRating(ride.rating || 0);
    setReviewText(ride.review || "");
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedRide(null);
    setReviewText("");
    setCurrentRating(0);
    setHoveredRating(0);
  };

  const submitReview = () => {
    if (selectedRide) {
      setRides(prev => 
        prev.map(ride => 
          ride.id === selectedRide.id 
            ? { ...ride, rating: currentRating, review: reviewText }
            : ride
        )
      );
      closeReviewModal();
    }
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Rate this ride";
    }
  };

  const generateReceipt = (ride) => {
    const receipt = `
GuzoTria Ride Receipt
========================
Ride ID: ${ride.id}
Date: ${ride.date}
Time: ${ride.time}
Scooter: ${ride.scooterName} (${ride.scooterId})

Route:
From: ${ride.startLocation}
To: ${ride.endLocation}

Details:
Distance: ${ride.distance} km
Duration: ${ride.duration} minutes
Cost: $${ride.cost}

Thank you for choosing GuzoTria!
    `;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ride-receipt-${ride.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const upcomingRides = rides.filter(ride => ride.status === "upcoming");
  const completedRides = rides.filter(ride => ride.status === "completed");

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              My Rides 🛴
            </h1>
            <p className="text-xl text-gray-600">
              Track your ride history and manage upcoming bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Rides</p>
                  <p className="text-3xl font-bold">{rides.length}</p>
                </div>
                <FaBicycle className="text-4xl text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{completedRides.length}</p>
                </div>
                <FaCheckCircle className="text-4xl text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm font-medium">Upcoming</p>
                  <p className="text-3xl font-bold">{upcomingRides.length}</p>
                </div>
                <FaClock className="text-4xl text-yellow-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Total Spent</p>
                  <p className="text-3xl font-bold">
                    ${rides.reduce((sum, ride) => sum + ride.cost, 0).toFixed(2)}
                  </p>
                </div>
                <FaDollarSign className="text-4xl text-purple-200" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Ride History</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                <FaFilter className="text-sm" />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Filter by Status
                    </label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Rides</option>
                      <option value="completed">Completed</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setFilterType("all");
                      setDateRange({ start: "", end: "" });
                    }}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {upcomingRides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Rides</h3>
              <div className="space-y-4">
                {upcomingRides.map((ride) => (
                  <div key={ride.id} className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(ride.status)}
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-white">${ride.cost}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaCalendarAlt className="text-blue-500" />
                        <span>{ride.date} at {ride.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaBicycle className="text-green-500" />
                        <span>{ride.scooterName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaClock className="text-purple-500" />
                        <span>{ride.duration} minutes</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300 mb-4">
                      <FaRoute className="text-orange-500" />
                      <span>{ride.startLocation} → {ride.endLocation}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Modify Booking
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Cancel Ride
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Ride History</h3>
            <div className="space-y-4">
              {filteredRides.filter(ride => ride.status === "completed").map((ride) => (
                <div key={ride.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(ride.status)}
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">${ride.cost}</span>
                      <button
                        onClick={() => generateReceipt(ride)}
                        className="text-gray-400 hover:text-white p-2"
                        title="Download Receipt"
                      >
                        <FaDownload className="text-lg" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-sm">{ride.date} at {ride.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <FaBicycle className="text-green-500" />
                      <span className="text-sm">{ride.scooterName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="text-sm">{ride.distance} km</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <FaClock className="text-purple-500" />
                      <span className="text-sm">{ride.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300 mb-4">
                    <FaRoute className="text-orange-500" />
                    <span className="text-sm">{ride.startLocation} → {ride.endLocation}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-white text-sm font-medium">Rate this ride:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRateRide(ride.id, rating)}
                            className="text-2xl transition-all duration-200 hover:scale-110"
                            title={`Rate ${rating} star${rating > 1 ? 's' : ''}`}
                          >
                            <FaStar
                              className={
                                rating <= ride.rating
                                  ? "text-yellow-400"
                                  : "text-gray-400 hover:text-yellow-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                      {ride.rating > 0 && (
                        <span className="text-yellow-400 text-sm font-medium ml-2">
                          {getRatingText(ride.rating)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {ride.review && (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <FaEdit className="text-xs" />
                          <span>Review Added</span>
                        </div>
                      )}
                      <button 
                        onClick={() => openReviewModal(ride)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors"
                      >
                        <FaEdit className="text-xs" />
                        {ride.review ? "Edit Review" : "Write Review"}
                      </button>
                    </div>
                  </div>
                  
                  {ride.review && (
                    <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                      <p className="text-gray-300 text-sm italic">"{ride.review}"</p>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredRides.filter(ride => ride.status === "completed").length === 0 && (
                <div className="text-center py-12">
                  <FaBicycle className="text-6xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No rides found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your filters or book your first ride!</p>
                  <Link to="/location">
                    <Button
                      name="Book a Ride"
                      type="primary"
                      textSize="text-lg"
                      padding="py-3 px-6"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready for your next ride?</h3>
                <p className="text-gray-300">Find and book scooters available near you.</p>
              </div>
              <Link to="/location">
                <Button
                  name="Book New Ride"
                  type="primary"
                  textSize="text-lg"
                  padding="py-3 px-6"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Rate & Review Your Ride</h3>
              <button
                onClick={closeReviewModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {selectedRide && (
              <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3 text-white">
                  <FaBicycle className="text-green-500" />
                  <div>
                    <p className="font-medium">{selectedRide.scooterName}</p>
                    <p className="text-sm text-gray-300">{selectedRide.date} at {selectedRide.time}</p>
                    <p className="text-sm text-gray-300">{selectedRide.startLocation} → {selectedRide.endLocation}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                Rate your experience
              </label>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setCurrentRating(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-3xl transition-all duration-200 hover:scale-110"
                  >
                    <FaStar
                      className={
                        rating <= (hoveredRating || currentRating)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }
                    />
                  </button>
                ))}
              </div>
              <p className="text-yellow-400 text-sm font-medium">
                {getRatingText(currentRating)}
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Write a review (optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this ride..."
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
                maxLength={500}
              />
              <p className="text-gray-400 text-xs mt-1">
                {reviewText.length}/500 characters
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={closeReviewModal}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                disabled={currentRating === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
