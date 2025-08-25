import { FiPower, FiShield } from "react-icons/fi";
import { FaPlug, FaShieldAlt, FaLeaf, FaExclamationCircle } from "react-icons/fa";

function WhyList({Icon, title, text}){
  return(
    <div className={`bg-[var(--bg-tertiary)] p-4 rounded-lg max-w-[25%] border-2 border-white flex-1`}>
      <div className="inline-flex items-center justify-center text-blue-700 mt-5 mb-7">
        <Icon className="text-5xl" />              
      </div>
      <div className="mb-3">
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      <div className="mb-3">
        <p className="text-xl">{text}</p>
      </div>
    </div>
  )
}

/* ==================================== Why Start ==================================== */
export default function Why(){
  return(
    <section>
      <div className="w-[90%] mx-auto text-white">
        <div className="my-[5rem]">
          <h1 className="capitalize text-5xl text-center font-bold">Why Choose Guzo?</h1>
        </div>

        <div className="flex items-stretch justify-around gap-5 mb-[5rem]">
          <WhyList 
            Icon={FaLeaf} 
            title="Sustainability" 
            text="Reduce your carbon footprint with our 100% electric scooters."
          />

          <WhyList 
            Icon={FaPlug} 
            title="Convenience" 
            text="Access scooters anytime, anywhere in your city with just a tap."
          />

          <WhyList 
            Icon={FaShieldAlt} 
            title="Safety" 
            text="Ride with peace of mind with our well-maintained scooters and safety guidelines."
          />
        </div>
      </div>
    </section>
  )
}
/* ==================================== Why End ==================================== */