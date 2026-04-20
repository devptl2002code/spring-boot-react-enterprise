import { Box, Button, Typography } from "@mui/material";
import { People, PersonAdd } from "@mui/icons-material";

interface EmployeeHeaderProps {
  employeeCount: number;
  onAddEmployee: () => void;
}

export const EmployeeHeader = ({ employeeCount, onAddEmployee }: EmployeeHeaderProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      mb={3}
      flexWrap="wrap"
      gap={2}
    >
      <Box>
        <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #285075, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(30,58,138,0.3)",
            }}
          >
            <People sx={{ fontSize: 20, color: "#fff" }} />
          </Box>
          <Box>
            <Typography variant="h4" color="text.primary" lineHeight={1}>
              People Directory
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.3}>
              {employeeCount} total employees
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAdd sx={{ fontSize: 18 }} />}
        onClick={onAddEmployee}
        sx={{ height: 42, px: 3 }}
      >
        Add Employee
      </Button>
    </Box>
  );
};