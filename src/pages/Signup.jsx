import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("member");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation rules
  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Name should contain only letters and spaces.";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10–15 digits).";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role,
      };

      const res = await axios.post("https://guzo-test-backend.onrender.com/api/user/register", payload);
      console.log("User registered:", res.data);

      // Save token if needed
      localStorage.setItem("token", res.data.token);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setRole("member");
      setErrors({});

      // Redirect to login or dashboard
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data?.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.password.trim() &&
    formData.confirmPassword.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-lg">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-navy mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector */}
          <div>
            <label className="block text-navy font-medium mb-1">Register As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-skyblue rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="member">User</option>
              <option value="owner">Scooter Owner</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border border-skyblue rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-2 border border-skyblue rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-skyblue rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-skyblue rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-2 border border-skyblue rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              isFormValid && !loading
                ? "bg-black text-white hover:bg-navy"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-navy">
          Already have an account?{" "}
          <Link to="/login" className="text-teal font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
