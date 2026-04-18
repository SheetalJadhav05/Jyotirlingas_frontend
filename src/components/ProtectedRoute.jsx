import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ admin required but user is not admin
  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
