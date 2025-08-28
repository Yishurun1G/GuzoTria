import React from "react";
import { useNavigate } from "react-router-dom";

function ScooterCard({ scooter, userLoggedIn }) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/scooters/${scooter.id}`);
  };

  const handleRentNow = () => {
    if (userLoggedIn) {
      console.log("Start booking for", scooter.name);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs h-[350px]">
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={scooter.image}
          alt={scooter.name}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[calc(100%-10rem)]">
        <div>
          <h2 className="text-lg font-bold mb-1">{scooter.name}</h2>
          <p className="text-gray-600 mb-3">Price: ${scooter.pricePerMin}/min</p>
        </div>

        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleLearnMore}
            className="flex-1 border border-blue-500 text-blue-500 rounded px-3 py-2 hover:bg-blue-50"
          >
            Learn More
          </button>
          <button
            onClick={handleRentNow}
            className="flex-1 bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScooterCard;
