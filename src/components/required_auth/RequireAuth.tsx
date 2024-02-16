import { FC } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../interfaces/Role";

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

  return role && allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
