import { FaCheck } from "react-icons/fa";
import Button from "./Button";

function PricingListDetails({lists}){
  return(
    <div className="flex flex-col">
      { lists.map((list) => (
          <div className="flex items-center gap-2 mb-2">
            <FaCheck className="text-sm text-[var(--secondary-color)]" /> 
            <p className="text-lg text-black/80">{list}</p>
          </div>
        ))  
      }
    </div>
  )
}

function PricingList({lists, plan, amount}){
  return(
    <div className="bg-white p-4 rounded-lg max-w-[25%]">
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-1">{plan}</h2>
        <h1 className="text-4xl font-bold">{amount}</h1>
      </div>

      <PricingListDetails
        lists={lists}
      />

      <div className="mt-7">
        <Button name="Choose Plan" />
      </div>
    </div>
  )
}

/* ==================================== Pricing Start ==================================== */
export default function Pricing(){
  return(
    <section className="pt-[5rem]">
      <div className="w-[90%] mx-auto bg-gray-100 p-10 rounded-lg">
        <div className="my-[5rem]">
          <h1 className="capitalize text-5xl text-center font-bold">Flexible pricing plans</h1>
        </div>

        <div className="flex items-center justify-around mb-[5rem]">

          <PricingList 
            plan="Pay per ride"
            amount="$1.00 / min"
            lists={["No monthly fees", "Perfect for occasional rides", "Flexible and convenient", "Standard support"]}
          />

          <PricingList 
            plan="Daily pass"
            amount="$19 / day"
            lists={["Unlimited rides for 24 hours", "Ideal for tourists & explorers", "Best value for a full day", "Priority customer support"]}
          />

          <PricingList 
            plan="Monthly plan"
            amount="$49 / month"
            lists={["Unlimited rides for 30 days", "Great for daily commuters", "Significant savings", "Premium customer support"]}
          />
          
        </div>
      </div>
    </section>
  )
}
/* ==================================== Pricing End ==================================== */