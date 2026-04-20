import { Card, CardContent, Typography, Chip } from "@mui/material";
import { FC } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  change,
  color = "primary",
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (title.includes("Salary")) return `₹${val.toLocaleString()}`;
      return val.toLocaleString();
    }
    return val;
  };

  const colorMap = {
    primary: "primary.main",
    secondary: "secondary.main",
    success: "success.main",
    warning: "warning.main",
    error: "error.main",
  };

  return (
    <Card
      sx={{
        height: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 8 },
      }}
    >
      <CardContent sx={{ pb: "12px !important" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={500}
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700} color="text.primary" mt={0.5}>
          {formatValue(value)}
        </Typography>
        {change && (
          <Chip
            label={change}
            size="small"
            sx={{
              mt: 1,
              height: 24,
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: change.startsWith("+") ? "success.50" : "error.50",
              color: change.startsWith("+") ? "success.main" : "error.main",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

