import { Navigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAdmin();

  if (loading) return <p>Checking admin access...</p>;

  return isAdmin ? children : <Navigate to="/login" />;
}
