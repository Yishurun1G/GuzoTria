import { FaBolt, FaCarSide, FaCloud } from "react-icons/fa6";

function SustainabilityList({ Icon, title, text }) {
  return (
    <div className="
      bg-[var(--bg-tertiary)]
      text-center
      p-5 md:p-6 lg:p-7
      rounded-lg
      w-full sm:w-[80%] md:w-[48%] lg:w-[32%] xl:w-[30%]
      max-w-[400px]
      border-2 border-white
      flex-1
      shadow-lg
      transition-transform duration-300 hover:scale-105
    ">
      <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-700 mt-5 mb-7">
        <Icon className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl" />
      </div>
      <div className="mb-3">
        <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold">{title}</h2>
      </div>
      <div className="mb-3">
        <p className="text-lg md:text-xl lg:text-xl xl:text-2xl">{text}</p>
      </div>
    </div>
  );
}

/* ==================================== Sustainability Start ==================================== */
export default function Sustainability() {
  return (
    <section>
      <div className="w-[90%] mx-auto p-5 md:p-8 lg:p-10 xl:p-12 text-white">
        {/* ======== Heading ======== */}
        <div className="my-10 md:my-14 lg:my-20 xl:my-24">
          <h1 className="capitalize text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold">
            Sustainability it works
          </h1>
        </div>

        {/* ======== Sustainability Cards ======== */}
        <div className="
          flex flex-col md:flex-row
          items-center md:items-stretch
          justify-center lg:justify-between xl:justify-around
          gap-8 md:gap-6 lg:gap-8 xl:gap-10
          mb-16
        ">
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
  );
}
/* ==================================== Sustainability End ==================================== */

