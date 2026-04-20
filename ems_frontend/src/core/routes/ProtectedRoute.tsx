import { Navigate } from "react-router-dom";
import { useAuth } from "@features/auth/hooks/useAuth";
import { CircularProgress, Box } from "@mui/material";
import { JSX } from "react/jsx-runtime";

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
