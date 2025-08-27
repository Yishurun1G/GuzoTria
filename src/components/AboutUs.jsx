// About.jsx
import React from "react";
import About4Img from "../assets/About4.jpg";
import About8Img from "../assets/About8.jpg"; 
import About1Img from "../assets/About12.jpg";
import About2Img from "../assets/About13.jpg";
import About3Img from "../assets/About10.jpg";
import SecureImg from "../assets/Secure.jpg";
import VerifyImg from "../assets/Verify.jpg";
import TrackImg from "../assets/Track.jpg";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen font-sans"> 

      {/* Intro Section */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              Guzo-Scooter
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            At <span className="font-semibold text-white">Guzo</span>, we believe
            transportation should be easy, affordable, and eco-friendly.
            Our platform connects scooter owners with riders who need them,
            making mobility seamless for everyone. Whether commuting,
            exploring, or running errands — you’ll always find a ride nearby.
          </p>
        </motion.div>

        {/* Right Column: Floating Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={About8Img}
            alt="About Guzo-Scooter"
            className="rounded-2xl shadow-lg w-full max-w-md 
                       transition-all duration-700 ease-in-out 
                       hover:scale-105 hover:shadow-[0_0_40px_#3b82f6]
                       shadow-gray-500"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src={About4Img}
            alt="Our Mission"
            className="rounded-2xl shadow-lg w-full max-w-md 
                       transition-all duration-700 ease-in-out 
                       hover:scale-105 hover:shadow-[0_0_40px_#3b82f6]
                       shadow-gray-500"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            At Guzo-Scooter, our mission is to transform everyday travel
            into an experience that is smarter, greener, and more connected.
            We reduce barriers to mobility by giving people reliable access
            to scooters — in busy cities or quiet towns.
            <br />
            <br />
            By empowering riders with affordable options and enabling
            owners to earn through sharing, we are building a
            community-driven movement toward a more sustainable future.
          </p>
        </motion.div>
      </section>
    

      {/* Belief Section */}
      <div className="flex flex-col items-center justify-center h-[70vh] px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white animate-fade-in">
          WE BELIEVE
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent animate-fade-in animate-delay-1000">
          MICRO-MOBILITY IS
        </h2>
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-300 animate-fade-in animate-delay-2000">
          THE FUTURE
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-400 animate-fade-in animate-delay-3000">
          OF MODERN URBAN LIFE
        </h3>
      </div>

      {/* Why Choose Us Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={About1Img}
          alt="Reliable Rides"
          className="absolute inset-0 w-full h-full object-cover scale-105 
                     rounded-b-[50px] shadow-xl 
                     transition-all duration-700 ease-in-out
                     hover:scale-110 hover:shadow-[0_0_50px_#3b82f6]
                     animate-floating-slow shadow-gray-500"
          style={{ objectPosition: "center top" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-blue-900/60 rounded-b-[50px]" />

        {/* Text content */}
        <div className="relative z-10 text-center px-6 space-y-6 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
            Why Choose Us?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed">
            At Guzo-Scooter, we believe transportation should be reliable, 
            sustainable, and affordable for everyone. Each ride you take 
            brings us closer to cleaner cities, stronger communities, 
            and smarter mobility solutions.
          </p>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={About2Img}
          alt="Eco Friendly"
          className="rounded-2xl shadow-lg w-full max-w-md 
                     transition-all duration-700 ease-in-out 
                     hover:scale-105 hover:shadow-[0_0_40px_#3b82f6]
                     animate-floating shadow-gray-500"
        />
        <div className="space-y-6 bg-black/80 text-white p-6 rounded-xl shadow-lg shadow-gray-500 
                        max-w-md transition-all duration-500 hover:shadow-[0_0_40px_#3b82f6] hover:scale-105">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Eco-Friendly Travel
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Choosing Guzo-Scooter means contributing to cleaner, 
            greener cities. Our scooters run on electricity, producing 
            zero direct emissions, while reducing noise pollution. 
            Each ride helps create healthier urban spaces, encourages 
            sustainable transportation, and supports a community committed to responsible mobility. 
          </p>
        </div>
      </section>

      {/* Affordable Rides Section */}
      <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1 bg-black/80 text-white p-6 rounded-xl shadow-lg shadow-gray-500 
                        max-w-md transition-all duration-500 hover:shadow-[0_0_40px_#3b82f6] hover:scale-105">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Affordable Rides
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
           Mobility shouldn’t be a luxury. Guzo-Scooter offers transparent, 
           budget-friendly pricing with no hidden fees. Whether commuting, running errands, 
           or exploring the city, our affordable rides give you freedom, reliability,
            and convenience without compromising quality.on 
            where you’re going — not how much it will cost to get there.
          </p>
        </div>
        <img
          src={About3Img}
          alt="Affordable"
          className="rounded-2xl shadow-lg w-full max-w-md 
                     transition-all duration-700 ease-in-out 
                     hover:scale-105 hover:shadow-[0_0_40px_#3b82f6]
                     animate-floating shadow-gray-500"
        />
      </section>
      {/* Security Section */}
<section className="px-6 md:px-16 py-24 bg-black text-white">
  {/* Security Header */}
  <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
    Security
  </h1>

  {/* Security Features Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Security Feature 1 */}
     
    <div className="flex flex-col items-center transition-all duration-500 hover:scale-105 border-spacing-6">
      <motion.div
            initial={{ x: -200, y: -200, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center transition-all duration-500 hover:scale-105"
          >
     
      <img
        src={SecureImg} 
        alt="Secure Payments"
        className="rounded-2xl shadow-lg shadow-yellow-700 w-full max-w-sm border border-gray-800"
      />
      <p className="text-gray-300 text-center mt-4">
        Secure Payments: All transactions are encrypted and protected to ensure your personal and financial data is safe.
      </p>
      </motion.div>
    </div>

    {/* Security Feature 2 */}
    <div className="flex flex-col items-center transition-all duration-500 hover:scale-105">
       <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center transition-all duration-500 hover:scale-105"
          >
      
      <img
        src={VerifyImg} 
        alt="Verified Riders"
        className="rounded-2xl shadow-lg w-full max-w-sm shadow-yellow-800 border border-blue-950"
      />
      <p className="text-gray-300 text-center mt-4">
        Verified Riders: Each rider is verified to ensure safety and reliability, giving you peace of mind on every trip.
      </p>
      </motion.div>
    </div>
  

    {/* Security Feature 3 */}
    <div className="flex flex-col items-center transition-all duration-500 hover:scale-105 border-spacing-1">
      <motion.div
            initial={{ x: 200, y: -200, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center transition-all duration-500 hover:scale-105"
          >
      <img
        src={TrackImg} 
        alt="24/7 Monitoring"
        className="rounded-2xl shadow-lg w-full h-60 max-w-sm shadow-yellow-700 border border-gray-800"
      />
      <p className="text-gray-300 text-center mt-4">
        24/7 Monitoring: Our system constantly monitors rides to prevent unauthorized activity and ensure rider safety.
      </p>
      </motion.div>
    </div>
  </div>
</section>

    </div>
  );
}
