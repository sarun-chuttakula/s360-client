import { FC } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Role } from "../enums/user.enum";

interface RequireAuthProps {
  allowedRoles: Role[];
}

const RequireAuth: FC<RequireAuthProps> = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const { role } = auth;
  if (
    (role && location.pathname === "/login") ||
    location.pathname === "/signup"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return role && allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
