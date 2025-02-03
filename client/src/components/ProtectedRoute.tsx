import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Check for JWT token

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect if no token
  }

  return <Outlet />; // Allow access if authenticated
};

export default ProtectedRoute;
