import { Navigate } from "react-router-dom";
import { useAuth } from "@features/auth/hooks/useAuth";
import { Role } from "@features/auth/types/auth.types";
import { JSX } from "react/jsx-runtime";

interface Props {
  allowedRoles: Role[];
  children: JSX.Element;
}

export const RoleGuard = ({ allowedRoles, children }: Props) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};