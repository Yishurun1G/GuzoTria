import { FaCreditCard, FaMobileAlt, FaWallet } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

function PaymentType({type, Icon, onClick, active}){
  return(
    <div 
      className={`flex items-center justify-around gap-2 bg-[#0000BD] text-lg font-bold px-4 py-2 rounded-lg cursor-pointer ${active ? "bg-[#0000BD] text-white" : "bg-transparent text-white/70 hover:bg-[#0000BD]/50"}`} onClick={onClick}>
      <Icon />
      <h2>{type}</h2>
    </div>
  )
}

function PaymentRideDetails({label, value}){
  return(
    <div className="flex items-center justify-between text-xl font-semibold">
      <p className="text-white/60">{label}:</p>
      <p>{value}</p>
    </div>
  )
}

export default function Payment(){
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = searchParams.get('type') || 'credit-card';

  function handleSelect(type){
    setSearchParams({type: type})
  }

  return(
    <>
      <Navbar />
      <section className="flex items-center justify-center h-auto my-30">
        <div className="w-[85%] text-white mx-auto grid grid-cols-2 gap-20">
          <div>
            <div className="text-3xl font-bold mb-8">
              <h1>Payment Summary</h1>
            </div>

            {/* Ride Details */}
            <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-10">
              <h2 className="text-2xl font-semibold mb-4">Ride Details</h2>
              <p className="text-xl mb-4">Scooter Model - Guzo Swift X1</p>
              <div>
                <PaymentRideDetails label="Guzo Scooter Rental" value="30 mins" />
                <PaymentRideDetails label="Rental Fee" value="ETB 150.00" />
                <PaymentRideDetails label="Tax (15%)" value="ETB 22.50" />
              </div>
              
            </div>

            {/* Total Due */}
            <div className="w-full bg-[#0000BD] rounded-xl px-8 py-4 mt-6">
              <p className="text-2xl font-bold mb-3">Total Due</p>
              <h1 className="text-4xl font-bold">ETB 172.50</h1>
            </div>
          </div>



          {/* Card */}
          <div>
            <div className="text-3xl font-bold mb-8">
              <h1>Payment Method</h1>
            </div>  

            {/* Payment Methods bg-[#0000BD] */}
            <div className="w-full bg-[var(--bg-tertiary)] rounded-xl px-6 py-2 flex items-center justify-between">
              <PaymentType Icon={FaCreditCard} type="Credit Card" active={selectedType === "credit-card"}
                onClick={() => handleSelect("credit-card")}                
              />
              <PaymentType Icon={FaMobileAlt} type="Mobile Money" active={selectedType === "mobile-money"}
                onClick={() => handleSelect("mobile-money")}
              />
              <PaymentType Icon={FaWallet} type="Guzo Wallet" active={selectedType === "guzo-wallet"} 
                onClick={() => handleSelect("guzo-wallet")} 
              />           
            </div>



            {/* Card Details */}
            <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-10 mt-6">

              {/* credit-card */}
              { selectedType === "credit-card" && (
              <div>
                <div className="mb-5">
                <p className="text-lg font-bold">Cardholder Name</p>
                <input type="text" placeholder="Abel Tesfaye"
                  className="w-full bg-[#505050] rounded-lg px-4 py-2 my-4 text-xl placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  />
                </div>

                <div className="relative">
                  <p className="text-lg font-bold">Card Number</p>
                  <input 
                    type="password" placeholder="XXXX XXXX XXXX XXXX" 
                    inputMode="numeric" pattern="[0-9]*" maxLength={16}
                    className="w-full bg-[#505050] rounded-lg px-4 py-2 my-4 text-xl placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                  />
                  <FaCreditCard className="absolute top-14 right-5 text-lg text-white/60" />
                </div>



                {/* Expiry  */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">Expiry Date</p>
                    <input type="text" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/\d{2}"
                      className="w-full bg-[#505050] rounded-lg px-4 py-2 my-4 text-xl placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-bold">CVV</p>
                    <input type="password" placeholder="XXX"
                      className="w-full bg-[#505050] rounded-lg px-4 py-2 my-4 text-xl placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    />
                  </div>
                </div>
              </div>
              )}

              {/* mobile-money */}
              { selectedType === "mobile-money" && (
              <div>
                <div className="text-xl font-semibold mb-8">
                  <h1>Mobile Money Details</h1>
                </div>
                <div className="mb-3">
                  <p className="text-lg font-bold">Phone Number</p>
                  <input type="text"  placeholder="e.g +251 912345678"
                    className="w-full bg-black rounded-lg px-4 py-1 my-4 text-xl text-white/80 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>

                <div>
                  <p className="text-lg font-bold mb-4">Mobile Network Provider</p>
                  <select id="paymentMethod" name="paymentMethod"
                  className="w-full p-2 rounded-lg bg-black text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                  <option value="" disabled selected>
                    -- Choose Payment Method --
                  </option>
                  <option value="cbe">CBE (Commercial Bank of Ethiopia)</option>
                  <option value="chapa">Chapa</option>
                  <option value="boa">Bank of Abyssinia</option>
                  <option value="dashen">Dashen Bank</option>
                </select>
                </div>
              </div>
              )}



              {/* guzo-wallet */}
              { selectedType === "guzo-wallet" && (
              <div>
                <div className="w-full flex items-center justify-between bg-[#0A0A0A] px-4 py-6">
                  <p className="text-lg font-bold">Wallet Balance</p>
                  <p className="text-4xl text-[#0000FF] font-bold">ETB 1,204.50</p>
                </div>

                <p className="text-lg font-bold mt-8">PIN</p>
                <input type="text" className="w-full bg-black px-4 py-6 my-4 text-xl text-white/80 placeholder:text-white/80 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your 4-digit PIN" />
              </div>
              )}
              
            </div>

            <div className="w-full bg-[#0000BD] rounded-xl px-4 py-2 text-center text-2xl font-bold mt-6 cursor-pointer">
              <button className="cursor-pointer">Confirm Payment</button>
            </div>

          </div>
        </div>
      </section>
    </>
    
  )
}