import { FaCheck } from "react-icons/fa";
import Button from "../Button";

function PricingListDetails({ lists }) {
  return (
    <div className="flex flex-col">
      {lists.map((list, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <FaCheck className="text-sm text-blue-700" />
          <p className="text-base sm:text-lg">{list}</p>
        </div>
      ))}
    </div>
  );
}

function PricingList({ lists, plan, amount }) {
  return (
    <div className="bg-[var(--bg-tertiary)] p-5 sm:p-6 rounded-lg w-full sm:w-[80%] md:w-[48%] lg:w-[30%] max-w-[400px] border-2 border-white shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">{plan}</h2>
        <h1 className="text-3xl sm:text-4xl font-bold">{amount}</h1>
      </div>

      <PricingListDetails lists={lists} />

      <div className="mt-7">
        <Button name="Choose Plan" block="w-full" link="/login" />
      </div>
    </div>
  );
}

/* ==================================== Pricing Start ==================================== */
export default function Pricing() {
  return (
    <section className="bg-[var(--bg-secondary)]">
      <div className="w-[90%] mx-auto text-white p-5 sm:p-8 md:p-10 rounded-lg">
        {/* ======== Heading ======== */}
        <div className="my-10 sm:my-14 md:my-20">
          <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl text-center font-bold">
            Flexible pricing plans
          </h1>
        </div>

        {/* ======== Pricing Cards ======== */}
        <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between gap-8 md:gap-5 mb-16">
          <PricingList
            plan="Pay per ride"
            amount="$1.00 / min"
            lists={[
              "No monthly fees",
              "Perfect for occasional rides",
              "Flexible and convenient",
              "Standard support",
            ]}
          />

          <PricingList
            plan="Daily pass"
            amount="$19 / day"
            lists={[
              "Unlimited rides for 24 hours",
              "Ideal for tourists & explorers",
              "Best value for a full day",
              "Priority customer support",
            ]}
          />

          <PricingList
            plan="Monthly plan"
            amount="$49 / month"
            lists={[
              "Unlimited rides for 30 days",
              "Great for daily commuters",
              "Significant savings",
              "Premium customer support",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
/* ==================================== Pricing End ==================================== */
