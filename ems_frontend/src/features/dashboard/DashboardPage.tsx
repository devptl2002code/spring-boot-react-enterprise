import { Box, Grid, Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "@app/providers/SnackbarProvider";
import { StatsCard } from "./components/StatsCard";
import { DashboardCharts } from "./components/DashboardCharts";
import { useDashboardStats, useRecentEmployees } from "./dashboard.hooks";
import { EmployeeStats } from "./dashboard.types";
import { Employee } from "../employees/employees.types";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DashboardPage = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { showSnackbar } = useSnackbar();

  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: recentEmployees, isLoading: recentLoading } = useRecentEmployees();

const statsCards = useMemo(() => {
    if (!stats) return [];
    return [
      { title: "Total Employees", value: stats.totalCount, color: "primary" as const },
      { title: "Avg Salary", value: stats.avgSalary, color: "secondary" as const },
      { 
        title: "Top Department", 
        value: stats.byDepartment
          ? Object.entries(stats.byDepartment)
              .sort(([,a], [,b]) => Number(b) - Number(a))[0]?.join(": ") || "N/A"
          : "N/A",
        color: "success" as const
      },
      { 
        title: "Salary <50k", 
        value: stats.salaryRanges ? (stats.salaryRanges["<50k"] || 0) : 0,
        color: "warning" as const
      },
    ];
  }, [stats]);

  if (statsError) {
    showSnackbar("Failed to load dashboard data", "error");
  }

  return (
    <Box sx={{ py: 4, backgroundColor: "grey.50" }}>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Dashboard
        </Typography>

        {statsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statsCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StatsCard {...card} />
                </Grid>
              ))}
            </Grid>

            {/* Charts */}
            {stats && <DashboardCharts stats={stats} />}

            {/* Recent Employees Table */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Recent Employees
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "grey.100" }}>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell align="right">Salary</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentEmployees?.map((emp) => (
                      <TableRow key={emp.id} hover>
                        <TableCell>{`${emp.firstName} ${emp.lastName}`}</TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell align="right">₹{emp.salary?.toLocaleString()}</TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                          {recentLoading ? "Loading..." : "No recent employees"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default DashboardPage;

