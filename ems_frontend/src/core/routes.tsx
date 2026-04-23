import { Navigate } from "react-router-dom";
// import { useAuth } from "@features/auth/hooks/useAuth";
import { CircularProgress, Box } from "@mui/material";
// import { Role } from "@features/auth/types/auth.types";
import { JSX } from "react/jsx-runtime";
import { useAuth } from "@features/auth/useAuth";
import { Role } from "@features/auth/auth.types";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

interface RoleGuardProps {
  allowedRoles: Role[];
  children: JSX.Element;
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
