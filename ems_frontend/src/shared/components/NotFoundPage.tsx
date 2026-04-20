import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" color="primary" gutterBottom>
        404
      </Typography>

      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        The page you are looking for does not exist.
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Dashboard
      </Button>
    </Box>
  );
};