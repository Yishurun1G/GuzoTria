import { useState } from "react";
import { FaBiking, FaChevronDown, FaEnvira, FaTachometerAlt } from "react-icons/fa";

function SafetyGrid({ Icon, title, detail }) {
  return (
    <>
      <div className="text-3xl text-blue-700">
        <Icon />
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-lg">{detail}</p>
      </div>
    </>
  );
}

function FAQLists({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-white/30 mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between text-lg font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="mb-2">{question}</p>
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out text-lg ${
          isOpen ? "max-h-40 opacity-100 mb-3" : "max-h-0 opacity-0"
        }`}
      >
        ➔ {answer}
      </div>
    </div>
  );
}

/* ==================================== Safety & FAQ Start ==================================== */
export default function FAQ() {
  return (
    <section className="bg-[var(--bg-tertiary)]">
      <div className="w-[90%] mx-auto p-5 md:p-8 lg:p-10 text-white">
        <div className="my-10 md:my-16">
          <h1 className="capitalize text-3xl md:text-4xl lg:text-5xl text-center font-bold">
            Safety & FAQ's
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-10 lg:gap-16 mb-10 lg:mb-20">
          {/* For Safety */}
          <div className="w-full md:w-1/2 lg:w-[45%]">
            <div className="mb-6 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Ride Safely with Guzo</h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-[auto_1fr] gap-4 md:gap-6">
              <SafetyGrid
                Icon={FaBiking}
                title="Wear a Helmet"
                detail="Always prioritize your safety by wearing a helmet during your ride."
              />
              <SafetyGrid
                Icon={FaEnvira}
                title="Park Responsibly"
                detail="Ensure your scooter is parked in designated areas and not obstructing pathways."
              />
              <SafetyGrid
                Icon={FaTachometerAlt}
                title="Follow Speed Limits"
                detail="Adhere to local speed regulations for a safe and enjoyable experience."
              />
            </div>
          </div>

          {/* For FAQ */}
          <div className="w-full md:w-1/2 lg:w-[45%]">
            <div className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
              Frequently Asked Questions
            </div>

            <FAQLists
              question="How do I start a ride?"
              answer="Open the Guzo app, find a nearby scooter, scan its QR code to unlock, and press the throttle to start riding."
            />
            <FAQLists
              question="What if I have an issue during my ride?"
              answer="Use the “Report Issue” button in the app or contact Guzo Support for quick help."
            />
            <FAQLists
              question="Where can I park the scooter?"
              answer="Park only in designated parking areas shown in the app and make sure the scooter is secured."
            />
            <FAQLists
              question="Are helmets required?"
              answer="Yes, we highly recommend wearing a helmet for your safety while riding."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
/* ==================================== Safety & FAQ End ==================================== */
