import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  // If admin is required, check admin login
  if (requireAdmin) {
    return isAdminLoggedIn ? children : <Navigate to="/login" replace />;
  }

  // For regular protected routes, check regular login
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}