import { FaBolt, FaCar, FaCarSide, FaBan, FaCloud } from "react-icons/fa6";

function SustainabilityList({Icon, title, text}){
  return(
    <div className="text-center max-w-[25%]">
      <div 
        className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-[var(--secondary-color)] mt-5 mb-7">
        <Icon className="text-5xl" />              
      </div>
      <div className="mb-3">
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      <div className="mb-3">
        <p className="text-xl text-black/50">{text}</p>
      </div>
    </div>
  )
}

/* ==================================== Sustainability Start ==================================== */
export default function Sustainability(){
  return(
    <section className="pt-[5rem]">
      <div className="w-[90%] mx-auto bg-gray-100 p-10 rounded-lg">
        <div className="my-[5rem]">
          <h1 className="capitalize text-5xl text-center font-bold">Sustainability it works</h1>
        </div>

        <div className="flex items-center justify-evenly mb-[5rem]">
          <SustainabilityList 
            Icon={FaCloud} 
            title="2,500+ Tons" 
            text="CO₂ Saved Annually" 
          />

          <SustainabilityList 
            Icon={FaCarSide} 
            title="1M+ Trips" 
            text="Car Trips Replaced" 
          />

          <SustainabilityList 
            Icon={FaBolt} 
            title="100% Renewable" 
            text="Energy Powered" 
          />
        </div>
      </div>
    </section>
  )
}
/* ==================================== Sustainability End ==================================== */