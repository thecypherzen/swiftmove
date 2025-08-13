import { Navigate } from "react-router";
import { useAuth } from "./UseAuth";
import type React from "react";

/**
 * @component
 * @name ProtectedRoute
 * @description - Requries authentication to access its children
 * @param {React.ComponentProps} props - prop with children
 * @returns A the rendered children if authenticated
 * or a Navigate component that renders a redirect to login page
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
