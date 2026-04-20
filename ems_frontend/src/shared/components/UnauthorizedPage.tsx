import { Box, Typography } from "@mui/material";

export const UnauthorizedPage = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" color="error">
        403 - Unauthorized Access
      </Typography>
    </Box>
  );
};