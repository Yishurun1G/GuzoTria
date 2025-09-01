import { FaPlug, FaShieldAlt, FaLeaf } from "react-icons/fa";

function WhyList({ Icon, title, text }) {
  return (
    <div className="bg-[var(--bg-tertiary)] p-5 sm:p-6 rounded-lg w-full sm:w-[80%] md:w-[60%] lg:w-[30%] max-w-[400px] shadow-[0_0.5rem_2rem_rgba(255,255,255,0.3)]  flex-1 transition-transform duration-300 hover:scale-105">
      <div className="inline-flex items-center justify-center text-blue-700 mt-5 mb-7">
        <Icon className="text-5xl sm:text-6xl" />
      </div>
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      </div>
      <div className="mb-3">
        <p className="text-lg sm:text-xl">{text}</p>
      </div>
    </div>
  );
}

/* ==================================== Why Start ==================================== */
export default function Why() {
  return (
    <section>
      <div className="w-[90%] mx-auto text-white">
        <div className="my-10 sm:my-14 md:my-20">
          <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl text-center font-bold">
            Why Choose Guzo?
          </h1>
        </div>

        <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-stretch justify-center md:justify-around gap-8 md:gap-5 mb-16">
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
  );
}
/* ==================================== Why End ==================================== */
