import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [ride, setRide] = useState(null);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rideId = searchParams.get("rideId"); // get ?rideId=123

  // ✅ Fetch ride details
  useEffect(() => {
    async function fetchRide() {
      try {
        if (!rideId) return;
        const res = await fetch(`http://localhost:8000/api/rides/${rideId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if protected
          },
        });
        const data = await res.json();
        if (res.ok) {
          setRide(data);
        } else {
          setError(data.message || "Failed to fetch ride");
        }
      } catch (err) {
        setError("Error fetching ride details");
        console.error(err);
      }
    }
    fetchRide();
  }, [rideId]);

  // ✅ Start payment with Chapa
  async function handlePayment() {
    if (!rideId) {
      alert("Ride not found. Please try again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:8000/api/payment/pay-for-ride/${rideId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if required
        },
      });

      const data = await res.json();

      if (res.ok && data?.data?.checkout_url) {
        // ✅ Redirect to Chapa checkout page
        window.location.href = data.data.checkout_url;
      } else {
        setError("Payment initialization failed");
        console.error(data);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Something went wrong while starting payment.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Check payment status after redirect (success/failure page)
  useEffect(() => {
    async function checkPaymentStatus() {
      const status = searchParams.get("status"); // e.g. ?status=success
      if (status && rideId) {
        try {
          const res = await fetch(`http://localhost:8000/api/payment/status/${rideId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();

          if (res.ok && data.status === "paid") {
            alert("✅ Payment successful!");
            navigate(`/rides/${rideId}`);
          } else {
            alert("❌ Payment not completed.");
            navigate("/payment/failed");
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    checkPaymentStatus();
  }, [rideId, searchParams, navigate]);

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
              {error && (
                <p className="text-red-500 text-lg font-semibold">{error}</p>
              )}
              {ride ? (
                <>
                  <p className="text-xl mb-4">
                    Scooter Model - {ride.scooter?.model || "N/A"}
                  </p>
                  <div className="flex items-center justify-between text-xl font-semibold">
                    <p className="text-white/60">Duration:</p>
                    <p>{ride.duration || "N/A"} mins</p>
                  </div>
                  <div className="flex items-center justify-between text-xl font-semibold">
                    <p className="text-white/60">Rental Fee:</p>
                    <p>ETB {ride.price || "0.00"}</p>
                  </div>
                  <div className="flex items-center justify-between text-xl font-semibold">
                    <p className="text-white/60">Tax (15%):</p>
                    <p>ETB {(ride.price * 0.15).toFixed(2)}</p>
                  </div>
                </>
              ) : (
                <p className="text-white/60">Loading ride details...</p>
              )}
            </div>

            <div className="w-full bg-[#0000BD] rounded-xl px-8 py-4 mt-6">
              <p className="text-2xl font-bold mb-3">Total Due</p>
              <h1 className="text-4xl font-bold">
                ETB{" "}
                {ride ? (ride.price * 1.15).toFixed(2) : "Loading..."}
              </h1>
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
                Click confirm to continue to Chapa secure checkout and complete
                your payment.
              </p>
            </div>

            <div
              onClick={handlePayment}
              className={`w-full bg-[#0000BD] rounded-xl px-4 py-2 text-center text-2xl font-bold mt-6 cursor-pointer ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button
                className="cursor-pointer disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
