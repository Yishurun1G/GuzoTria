import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { 
  FaSpinner, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle, 
  FaRedo, 
  FaHistory, 
  FaClock, 
  FaEye,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [rideLoading, setRideLoading] = useState(true);
  const [ride, setRide] = useState(null);
  const [error, setError] = useState(null);
  const [paymentState, setPaymentState] = useState('idle'); // 'idle', 'processing', 'success', 'failed'
  const [transactionRef, setTransactionRef] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [verificationLoading, setVerificationLoading] = useState(false);
  
  // Payment History States
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const [hasMoreHistory, setHasMoreHistory] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rideId = searchParams.get("rideId");
  const txRef = searchParams.get("tx_ref");
  const status = searchParams.get("status");

  // Fetch ride details
  useEffect(() => {
    async function fetchRide() {
      try {
        if (!rideId) {
          setError("Ride ID not found. Please try again.");
          setRideLoading(false);
          return;
        }

        setRideLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:8000/api/rides/${rideId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        
        if (res.ok) {
          setRide(data);
        } else {
          setError(data.message || "Failed to fetch ride details");
        }
      } catch (err) {
        setError("Error fetching ride details. Please check your connection.");
        console.error("Ride fetch error:", err);
      } finally {
        setRideLoading(false);
      }
    }
    fetchRide();
  }, [rideId]);

  // Handle payment callback verification
  useEffect(() => {
    async function verifyPayment() {
      if (!txRef || !rideId) return;

      try {
        setVerificationLoading(true);
        setPaymentState('processing');

        const res = await fetch(`http://localhost:8000/api/payment/verify/${txRef}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.status === "success") {
          setPaymentState('success');
          setTransactionRef(txRef);
        } else {
          setPaymentState('failed');
          setError(data.message || "Payment verification failed");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setPaymentState('failed');
        setError("Payment verification failed. Please contact support.");
      } finally {
        setVerificationLoading(false);
      }
    }

    if (txRef && rideId) {
      verifyPayment();
    }
  }, [txRef, rideId]);

  // Start payment with Chapa
  async function handlePayment() {
    if (!rideId) {
      setError("Ride not found. Please try again.");
      return;
    }

    if (!ride) {
      setError("Ride details not loaded. Please wait and try again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPaymentState('processing');

      const res = await fetch(`http://localhost:8000/api/payment/pay-for-ride/${rideId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok && data?.data?.checkout_url) {
        // Store transaction reference for later verification
        if (data.data.tx_ref) {
          setTransactionRef(data.data.tx_ref);
        }
        // Redirect to Chapa checkout page
        window.location.href = data.data.checkout_url;
      } else {
        setError(data.message || "Payment initialization failed");
        setPaymentState('failed');
        console.error("Payment init error:", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Network error. Please check your connection and try again.");
      setPaymentState('failed');
    } finally {
      setLoading(false);
    }
  }

  // Retry payment initialization
  const handleRetry = () => {
    setError(null);
    setRetryCount(prev => prev + 1);
    handlePayment();
  };

  // Handle success navigation
  const handleSuccessNavigation = () => {
    navigate(`/rides/${rideId}?payment=success`);
  };

  // Handle failure navigation
  const handleFailureNavigation = () => {
    navigate(`/rides/${rideId}?payment=failed`);
  };

  // Fetch payment history
  const fetchPaymentHistory = async (page = 1, loadMore = false) => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);

      const res = await fetch(`http://localhost:8000/api/payment/history?page=${page}&limit=10`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        if (loadMore) {
          setPaymentHistory(prev => [...prev, ...data.payments]);
        } else {
          setPaymentHistory(data.payments);
        }
        setHasMoreHistory(data.hasMore || false);
        setHistoryPage(page);
      } else {
        setHistoryError(data.message || "Failed to fetch payment history");
      }
    } catch (err) {
      console.error("Payment history error:", err);
      setHistoryError("Error fetching payment history. Please try again.");
    } finally {
      setHistoryLoading(false);
    }
  };

  // Load more payment history
  const loadMoreHistory = () => {
    if (!historyLoading && hasMoreHistory) {
      fetchPaymentHistory(historyPage + 1, true);
    }
  };

  // Toggle payment history visibility
  const toggleHistory = () => {
    if (!showHistory && paymentHistory.length === 0) {
      fetchPaymentHistory();
    }
    setShowHistory(!showHistory);
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'paid':
        return { icon: FaCheckCircle, color: 'text-green-500', text: 'Paid' };
      case 'failed':
        return { icon: FaTimesCircle, color: 'text-red-500', text: 'Failed' };
      case 'pending':
        return { icon: FaClock, color: 'text-yellow-500', text: 'Pending' };
      default:
        return { icon: FaExclamationTriangle, color: 'text-gray-500', text: 'Unknown' };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Success Screen
  if (paymentState === 'success') {
    return (
      <>
        <Navbar />
        <section className="flex items-center justify-center h-auto my-30">
          <div className="w-[85%] text-white mx-auto text-center">
            <div className="bg-[var(--bg-tertiary)] rounded-xl p-10 max-w-2xl mx-auto">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 text-green-500">Payment Successful!</h1>
              <p className="text-xl mb-6 text-white/80">
                Your payment has been processed successfully.
              </p>
              {transactionRef && (
                <div className="bg-[#0000BD] rounded-lg p-4 mb-6">
                  <p className="text-lg font-semibold">Transaction Reference:</p>
                  <p className="text-xl font-mono">{transactionRef}</p>
                </div>
              )}
              <button
                onClick={handleSuccessNavigation}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-xl font-bold transition-colors"
              >
                View Ride Details
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Failure Screen
  if (paymentState === 'failed') {
    return (
      <>
        <Navbar />
        <section className="flex items-center justify-center h-auto my-30">
          <div className="w-[85%] text-white mx-auto text-center">
            <div className="bg-[var(--bg-tertiary)] rounded-xl p-10 max-w-2xl mx-auto">
              <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 text-red-500">Payment Failed</h1>
              <p className="text-xl mb-6 text-white/80">
                {error || "Your payment could not be processed."}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition-colors flex items-center gap-2"
                >
                  <FaRedo />
                  Try Again
                </button>
                <button
                  onClick={handleFailureNavigation}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition-colors"
                >
                  Back to Ride
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center h-auto my-30">
        <div className="w-[85%] text-white mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Ride Summary */}
            <div>
              <div className="text-3xl font-bold mb-8">
                <h1>Payment Summary</h1>
              </div>

              <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-10">
                <h2 className="text-2xl font-semibold mb-4">Ride Details</h2>
                
                {/* Loading State */}
                {rideLoading && (
                  <div className="flex items-center justify-center py-8">
                    <FaSpinner className="animate-spin text-2xl mr-3" />
                    <p className="text-white/60">Loading ride details...</p>
                  </div>
                )}

                {/* Error State */}
                {error && !rideLoading && (
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaExclamationTriangle className="text-red-500" />
                      <p className="text-red-500 font-semibold">Error</p>
                    </div>
                    <p className="text-red-300">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-red-300 hover:text-red-200 underline"
                    >
                      Refresh page
                    </button>
                  </div>
                )}

                {/* Ride Details */}
                {ride && !rideLoading && (
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

            {/* Payment Method */}
            <div>
              <div className="text-3xl font-bold mb-8">
                <h1>Payment Method</h1>
              </div>

              <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-10 mt-6">
                <h1 className="text-xl font-semibold mb-8">Chapa Checkout</h1>
                <p className="text-lg text-white/70 mb-6">
                  Click confirm to continue to Chapa secure checkout and complete your payment.
                </p>
                
                {/* Payment Error Display */}
                {error && !rideLoading && (
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <FaExclamationTriangle className="text-red-500" />
                      <p className="text-red-500 font-semibold">Payment Error</p>
                    </div>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {/* Verification Loading */}
                {verificationLoading && (
                  <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FaSpinner className="animate-spin text-blue-500" />
                      <p className="text-blue-300">Verifying payment...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <div
                onClick={handlePayment}
                className={`w-full bg-[#0000BD] rounded-xl px-4 py-2 text-center text-2xl font-bold mt-6 cursor-pointer transition-all ${
                  loading || rideLoading || !ride ? "opacity-50 pointer-events-none" : "hover:bg-blue-700"
                }`}
              >
                <button
                  className="cursor-pointer disabled:opacity-50 w-full py-3"
                  disabled={loading || rideLoading || !ride}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </div>
                  ) : rideLoading ? (
                    "Loading..."
                  ) : !ride ? (
                    "Ride not found"
                  ) : (
                    "Confirm Payment"
                  )}
                </button>
              </div>

              {/* Retry Button (if payment failed) */}
              {error && !loading && retryCount > 0 && (
                <button
                  onClick={handleRetry}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-lg font-bold mt-4 transition-colors flex items-center justify-center gap-2"
                >
                  <FaRedo />
                  Retry Payment
                </button>
              )}

              {/* Payment History Section */}
              <div className="mt-8">
                <div className="w-full bg-[var(--bg-tertiary)] rounded-xl p-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={toggleHistory}
                  >
                    <div className="flex items-center gap-3">
                      <FaHistory className="text-blue-500 text-xl" />
                      <h2 className="text-xl font-semibold">Payment History</h2>
                    </div>
                    {showHistory ? (
                      <FaChevronUp className="text-white/60" />
                    ) : (
                      <FaChevronDown className="text-white/60" />
                    )}
                  </div>

                  {showHistory && (
                    <div className="max-h-96 overflow-y-auto">
                      {historyLoading && paymentHistory.length === 0 ? (
                        <div className="flex items-center justify-center py-8">
                          <FaSpinner className="animate-spin text-2xl mr-3" />
                          <p className="text-white/60">Loading payment history...</p>
                        </div>
                      ) : historyError ? (
                        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FaExclamationTriangle className="text-red-500" />
                            <p className="text-red-500 font-semibold">Error</p>
                          </div>
                          <p className="text-red-300 text-sm">{historyError}</p>
                          <button
                            onClick={() => fetchPaymentHistory()}
                            className="mt-2 text-red-300 hover:text-red-200 underline text-sm"
                          >
                            Try again
                          </button>
                        </div>
                      ) : paymentHistory.length === 0 ? (
                        <div className="text-center py-8">
                          <FaHistory className="text-white/40 text-4xl mx-auto mb-4" />
                          <p className="text-white/60">No payment history found</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {paymentHistory.map((payment, index) => {
                            const StatusIcon = getStatusDisplay(payment.status).icon;
                            const statusColor = getStatusDisplay(payment.status).color;
                            const statusText = getStatusDisplay(payment.status).text;

                            return (
                              <div key={index} className="bg-[#0000BD]/20 rounded-lg p-4 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <StatusIcon className={`${statusColor} text-lg`} />
                                    <span className={`font-semibold ${statusColor}`}>{statusText}</span>
                                  </div>
                                  <span className="text-white/60 text-sm">
                                    {formatDate(payment.createdAt)}
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-white/60">Amount:</p>
                                    <p className="font-semibold">ETB {payment.amount}</p>
                                  </div>
                                  <div>
                                    <p className="text-white/60">Ride ID:</p>
                                    <p className="font-mono text-xs">{payment.rideId}</p>
                                  </div>
                                </div>
                                
                                <div className="mt-2">
                                  <p className="text-white/60 text-xs">Transaction Ref:</p>
                                  <p className="font-mono text-xs text-white/80 break-all">{payment.transactionRef}</p>
                                </div>
                              </div>
                            );
                          })}

                          {/* Load More Button */}
                          {hasMoreHistory && (
                            <div className="text-center pt-4">
                              <button
                                onClick={loadMoreHistory}
                                disabled={historyLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto"
                              >
                                {historyLoading ? (
                                  <>
                                    <FaSpinner className="animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  <>
                                    <FaEye />
                                    Load More
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
