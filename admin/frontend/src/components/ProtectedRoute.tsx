import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = "/login" }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("mistri-admin")
  );

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("mistri-admin"));

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
