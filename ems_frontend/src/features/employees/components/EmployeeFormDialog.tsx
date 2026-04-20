import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Employee } from "../employees.types";

interface EmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: string;
}

interface EmployeeFormDialogProps {
  open: boolean;
  onClose: () => void;
  editingEmployee: Employee | null;
  form: EmployeeForm;
  onFormChange: (form: EmployeeForm) => void;
  onSubmit: () => void;
}

export const EmployeeFormDialog = ({
  open,
  onClose,
  editingEmployee,
  form,
  onFormChange,
  onSubmit,
}: EmployeeFormDialogProps) => {
  const handleChange = (field: keyof EmployeeForm, value: string) => {
    onFormChange({ ...form, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "9px",
              background: "linear-gradient(135deg, #285075, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonAdd sx={{ fontSize: 17, color: "#fff" }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            {editingEmployee ? "Edit Employee" : "New Employee"}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: "20px !important" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salary (₹)"
              type="number"
              value={form.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="primary" sx={{ flex: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit} sx={{ flex: 2 }}>
          {editingEmployee ? "Save Changes" : "Create Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};