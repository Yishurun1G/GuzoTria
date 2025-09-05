import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = "test@gmail.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard"); // redirect to dashboard
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 font-bold hover:underline"
        >
          &larr; Back to Home
        </button>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>
        <p className="text-lg text-gray-500 text-center mb-6">
          Login to access your dashboard
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center text-lg font-medium mb-6">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-xl p-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-xl p-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Extra Info */}
        <p className="mt-6 text-center text-lg text-gray-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
