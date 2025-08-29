import { FiSearch, FiRotateCcw, FiLock } from "react-icons/fi";

function HowList({ Icon, title, text }) {
  return (
    <div className="bg-[var(--bg-tertiary)] border-2 border-white text-center p-5 sm:p-6 rounded-lg w-full sm:w-[80%] md:w-[60%] lg:w-[30%] max-w-[400px] shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full text-blue-700 mt-5 mb-7">
        <Icon className="text-5xl" />
      </div>
      <div className="mb-3">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      </div>
      <div className="mb-3">
        <p className="text-lg md:text-xl">{text}</p>
      </div>
    </div>
  );
}

/* ==================================== How Start ==================================== */
export default function How() {
  return (
    <section className="bg-[var(--bg-secondary)]">
      <div className="w-[90%] mx-auto text-white p-5 sm:p-8 md:p-10 rounded-lg">
        <div className="my-10 sm:my-14 md:my-20">
          <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl text-center font-bold">
            How it works
          </h1>
        </div>

        <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-stretch justify-center md:justify-around gap-8 md:gap-5 mb-16">
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
            text="End your ride securely within designated parking zones."
          />
        </div>
      </div>
    </section>
  );
}
/* ==================================== How End ==================================== */
