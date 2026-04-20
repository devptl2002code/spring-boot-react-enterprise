import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";

interface EmployeeSearchProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  isLoading: boolean;
}

export const EmployeeSearch = ({
  globalFilter,
  onGlobalFilterChange,
  isLoading,
}: EmployeeSearchProps) => {
  return (
    <TextField
      placeholder="Search by name, email, department…"
      variant="outlined"
      size="small"
      value={globalFilter}
      onChange={(e) => onGlobalFilterChange(e.target.value)}
      sx={{ mb: 2.5, maxWidth: 420, width: "100%" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ fontSize: 18, color: "text.secondary" }} />
          </InputAdornment>
        ),
        endAdornment: isLoading ? (
          <InputAdornment position="end">
            <CircularProgress size={16} sx={{ color: "#ed964a" }} />
          </InputAdornment>
        ) : null,
      }}
    />
  );
};