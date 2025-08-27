import { FiSearch, FiRotateCcw, FiLock } from "react-icons/fi";

function HowList({Icon, title, text}){
  return(
    <div className="bg-white text-center p-4 rounded-lg max-w-[25%]">
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

/* ==================================== How Start ==================================== */
export default function How(){
  return(
    <section className="pt-[10rem]">
      <div className="w-[90%] mx-auto bg-gray-100 p-10 rounded-lg">
        <div className="my-[5rem]">
          <h1 className="capitalize text-5xl text-center font-bold">How it works</h1>
        </div>

        <div className="flex items-center justify-around gap-5 mb-[5rem]">
          <HowList 
            Icon={FiSearch} 
            title="Find a GuzoDot" 
            text="Locate nearby Guzo scooters on the app with ease." 
          />

          <HowList 
            Icon={FiRotateCcw} 
            title="Unlock & ride" 
            text="Scan the QR code to unlock your scooter and start your journey." 
          />

          <HowList 
            Icon={FiLock} 
            title="Park & lock" 
            text="End your ride securly within designated parking zones." 
          />
        </div>
      </div>
    </section>
  )
}
/* ==================================== How End ==================================== */