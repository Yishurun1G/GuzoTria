import Navbar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const rideId = searchParams.get("rideId"); // get rideId from query param ?rideId=123

  async function handlePayment() {
    if (!rideId) {
      alert("Ride not found. Please try again.");
      return;
    }

    try {
      setLoading(true);
      // adjust base URL
      const res = await fetch(`http://localhost:8000/api/payments/pay-for-ride/${rideId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      });

      const data = await res.json();

      if (data?.data?.checkout_url) {
        // Redirect to Chapa checkout page
        window.location.href = data.data.checkout_url;
      } else {
        alert("Payment initialization failed");
        console.error(data);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while starting payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center h-auto my-30">
        <div className="w-[85%] text-white mx-auto grid grid-cols-2 gap-20">
          {/* Ride Summary */}
          <div>
            <div className="text-3xl font-bold mb-8">
              <h1>Payment Summary</h1>
            </div>

            <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-10">
              <h2 className="text-2xl font-semibold mb-4">Ride Details</h2>
              <p className="text-xl mb-4">Scooter Model - Guzo Swift X1</p>
              <div className="flex items-center justify-between text-xl font-semibold">
                <p className="text-white/60">Guzo Scooter Rental:</p>
                <p>30 mins</p>
              </div>
              <div className="flex items-center justify-between text-xl font-semibold">
                <p className="text-white/60">Rental Fee:</p>
                <p>ETB 150.00</p>
              </div>
              <div className="flex items-center justify-between text-xl font-semibold">
                <p className="text-white/60">Tax (15%):</p>
                <p>ETB 22.50</p>
              </div>
            </div>

            <div className="w-full bg-[#0000BD] rounded-xl px-8 py-4 mt-6">
              <p className="text-2xl font-bold mb-3">Total Due</p>
              <h1 className="text-4xl font-bold">ETB 172.50</h1>
            </div>
          </div>

          {/* Chapa Payment */}
          <div>
            <div className="text-3xl font-bold mb-8">
              <h1>Payment Method</h1>
            </div>

            <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-10 mt-6">
              <h1 className="text-xl font-semibold mb-8">Chapa Checkout</h1>
              <p className="text-lg text-white/70">
                Click confirm to continue to Chapa secure checkout and complete your payment.
              </p>
            </div>

            <div onClick={handlePayment} disabled={loading}
            className="w-full bg-[#0000BD] rounded-xl px-4 py-2 text-center text-2xl font-bold mt-6 cursor-pointer">
              <button className="cursor-pointer disabled:opacity-50" disabled={loading}>
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
