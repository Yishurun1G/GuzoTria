import scooterImage from "../../assets/images/landingPage/scooter.jpg";
import Button from "../Button";
import { FaComments, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Chatbot from "../../pages/Chatbot"; // ⬅️ Import the separate component

export default function Hero({ children }) {
  const [showChat, setShowChat] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full h-[100vh] bg-cover bg-center text-white"
      style={{backgroundImage: `url(${scooterImage})`}}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90">
        {children}
        <div className="flex flex-col items-center justify-center h-full text-center mt-[7rem]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Move Smarter. Go Faster.
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl mb-6">
            Rent electric scooters anytime, anywhere — simple, fast, and eco-friendly.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              name="Rent a Scooter"
              type="primary"
              textSize="text-2xl"
              font="font-semibold"
              padding="py-4 px-8"
            />
            <Button
              name="Find Nearby Stations"
              type="secondary"
              textSize="text-2xl"
              font="font-semibold"
              padding="py-4 px-8"
            />
          </div>
        </div>

        {/* Floating Chat Toggle Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
        >
          {showChat ? <FaTimes size={20} /> : <FaComments size={24} />}
        </button>

        {/* Show Chatbot Component */}
        {showChat && (
          <div className="fixed bottom-20 right-6">
            <Chatbot />
          </div>
        )}
      </div>
    </section>
  );
}















// export default function HeroSection() {
//   return (
//     <section
//       className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white"
//       style={{ backgroundImage: "url('../assets/images/scooter.jpg')" }}
//     >
//       {/* Overlay for darker effect */}
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

//       {/* Content */}
//       <div className="relative z-10 text-center px-6 max-w-2xl">
//         <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
//           Move Smarter. Go Faster.
//         </h1>
//         <p className="text-lg md:text-xl mb-6">
//           Rent electric scooters anytime, anywhere — simple, fast, and eco-friendly.
//         </p>

//         <div className="flex flex-col md:flex-row gap-4 justify-center">
//           <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition">
//             Rent a Scooter
//           </button>
//           <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-full font-semibold transition">
//             Find Nearby Stations
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
