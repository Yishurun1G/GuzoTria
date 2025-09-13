import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Star, Download } from "lucide-react";

// Dummy Data (Replace with API data later)
const dummyRides = [
  {
    id: 1,
    type: "Past",
    date: "2025-08-25",
    time: "10:30 AM",
    distance: "5.2 km",
    cost: "$12.50",
    pickup: "Central Park",
    dropoff: "Downtown Plaza",
    rating: 4,
  },
  {
    id: 2,
    type: "Upcoming",
    date: "2025-09-10",
    time: "2:00 PM",
    distance: "8.1 km",
    cost: "$18.00",
    pickup: "Main Station",
    dropoff: "City Mall",
    rating: 0,
  },
];

export default function MyRides() {
  const [rides, setRides] = useState(dummyRides);
  const [filter, setFilter] = useState("All");
  const [selectedRide, setSelectedRide] = useState(null);

  // Filter rides based on selection
  const filteredRides =
    filter === "All"
      ? rides
      : rides.filter((ride) => ride.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6 my-15">
      <motion.div
        className="max-w-5xl mx-auto my-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Rides</h1>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          {["All", "Past", "Upcoming"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Ride Cards */}
        <div className="grid gap-4">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <motion.div
                key={ride.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Ride Info */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} /> <span>{ride.date}</span>
                    <Clock size={18} className="ml-4" /> <span>{ride.time}</span>
                  </div>
                  <p className="text-lg font-semibold mt-2">
                    {ride.pickup} → {ride.dropoff}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {ride.distance} | {ride.cost}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 md:mt-0">
                  {ride.type === "Past" && (
                    <button
                      onClick={() => setSelectedRide(ride)}
                      className="px-3 py-2 text-sm flex items-center gap-2 border rounded-lg hover:bg-gray-100"
                    >
                      <Star size={16} /> Rate
                    </button>
                  )}
                  <button className="px-3 py-2 text-sm flex items-center gap-2 border rounded-lg hover:bg-gray-100">
                    <Download size={16} /> receipts
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No rides found.</p>
          )}
        </div>
      </motion.div>

      {/* Rating Modal */}
      {selectedRide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-96"
          >
            <h2 className="text-xl font-bold mb-4">
              Rate Ride: {selectedRide.pickup} → {selectedRide.dropoff}
            </h2>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer ${
                    star <= selectedRide.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSelectedRide(null)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
