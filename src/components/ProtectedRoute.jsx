import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useUser();

  if (loading) {
    if (!localStorage.getItem("access_token")) return <Navigate to="/login" replace />;
    return null;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
