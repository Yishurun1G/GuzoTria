import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import city from "../assets/image/city.jpg";
import scooter from "../assets/image/scooter.jpg";

import park from "../assets/image/rule1.jpg";
import helmet from "../assets/image/rule4.jpg";
import drink from "../assets/image/rule8.jpg";
import speed from "../assets/image/rule2.jpg";
import pedestrian from "../assets/image/rule5.jpg";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 9.03, // Addis Ababa latitude
  lng: 38.74, // Addis Ababa longitude
};

const popularSpots = ["Meskel Square", "Bole Road", "Arat Kilo", "Piassa"];

export default function Location() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Section 1 - Hero */}
      <section className="grid md:grid-cols-2 min-h-screen bg-gray-900 text-white">
        {/* Left - City */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={city} alt="City" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Find a Scooter Near You
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Explore your city with our scooters. Choose a nearby location and
              start your ride instantly.
            </motion.p>
          </div>
        </motion.div>

        {/* Right - Scooter Info */}
        <motion.div
          className="flex flex-col justify-center items-center bg-gray-900 p-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={scooter}
            alt="Scooter"
            className="w-3/4 max-w-md mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">
            Available Locations
          </h2>
          <ul className="space-y-3 text-gray-700 w-full max-w-sm">
            {[
              { name: "Addis Ababa", status: "Active" },
              { name: "Megenagna", status: "Active" },
              { name: "Bole", status: "Coming Soon" },
              { name: "Arat Kilo", status: "Active" },
              { name: "Mexico", status: "Active" },
              { name: "Piassa", status: "Coming Soon" },
            ].map((town, idx) => (
              <motion.li
                key={idx}
                className="flex justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-100 transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{town.name}</span>
                <span
                  className={`font-medium ${
                    town.status === "Active"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {town.status}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Section 2 - Interactive Google Map */}
      <section className="bg-gray-900 text-white p-6">
        <motion.div
          className="bg-gray-900 rounded-2xl overflow-hidden mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Search bar */}
          <div className="relative p-4">
            <input
              type="text"
              placeholder="Search for a location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Google Map */}
          <LoadScript googleMapsApiKey="AIzaSyA-n9UhGPC1_-o5MCBuC_91tGlXlwamA2Q">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </motion.div>

        {/* Popular Spots */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Popular Scooter Spots</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSpots.map((spot, idx) => {
              const match =
                search && spot.toLowerCase().includes(search.toLowerCase());
              return (
                <motion.div
                  key={idx}
                  className={`flex items-center justify-center gap-2 rounded-lg py-4 px-6 cursor-pointer transition ${
                    match
                      ? "font-bold text-green-400 bg-gray-800"
                      : "text-gray-300 bg-gray-900 hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span>{spot}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 - Rules of the Road */}
      <section className="bg-gray-900 py-16 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Rules of the Road
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { img: park, title: "Park Properly" },
            { img: helmet, title: "Obey Traffic Rules" },
            { img: drink, title: "Use Bike Lanes Where Possible" },
            { img: speed, title: "Respect Speed Limits" },
            { img: pedestrian, title: "Don’t Drink and Ride" },
          ].map((rule, idx) => (
            <motion.div
              key={idx}
              className="min-w-[280px] flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={rule.img}
                alt={rule.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {rule.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
