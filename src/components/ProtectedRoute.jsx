import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ requireAdmin = false }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  // If admin is required, check admin login
  if (requireAdmin) {
    return isAdminLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
  }

  // For regular protected routes, check regular login
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}