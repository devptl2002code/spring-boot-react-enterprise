import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from "recharts";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { EmployeeStats } from "../dashboard.types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface DashboardChartsProps {
  stats: EmployeeStats;
}

export const DashboardCharts: FC<DashboardChartsProps> = ({ stats }) => {
  const deptData = Object.entries(stats.byDepartment).map(([name, value]) => ({
    name,
    value,
  }));

  const salaryData = Object.entries(stats.salaryRanges).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, height: 300 }}>
      {/* Department Pie Chart */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
          Employees by Department
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={deptData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              nameKey="name"
            >
              {deptData.map((entry, index) => (
                <Cell key={`dept-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Salary Ranges Bar Chart */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
          Salary Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salaryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

