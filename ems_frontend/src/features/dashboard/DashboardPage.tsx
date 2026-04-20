import {
  Box,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Fade,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "@app/providers/SnackbarProvider";
import { StatsCard } from "./components/StatsCard";
import { DashboardCharts } from "./components/DashboardCharts";
import { useDashboardStats, useRecentEmployees } from "./dashboard.hooks";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  PeopleAlt,
  AttachMoney,
  Business,
  Warning,
} from "@mui/icons-material";

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { showSnackbar } = useSnackbar();

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useDashboardStats();
  const { data: recentEmployees, isLoading: recentLoading } =
    useRecentEmployees();

  const statsCards = useMemo(() => {
    if (!stats) return [];
    const topDept = stats.byDepartment
      ? Object.entries(stats.byDepartment).sort(
          ([, a], [, b]) => Number(b) - Number(a),
        )[0]
      : null;

    return [
      {
        title: "Total Employees",
        value: stats.totalCount,
        color: "primary" as const,
        icon: <PeopleAlt sx={{ fontSize: 32 }} />,
        trend: "+12%",
        trendUp: true,
      },
      {
        title: "Avg Salary",
        value: `₹${stats.avgSalary.toLocaleString()}`,
        color: "secondary" as const,
        icon: <AttachMoney sx={{ fontSize: 32 }} />,
        trend: "+5%",
        trendUp: true,
      },
      {
        title: "Top Department",
        value: topDept ? topDept[0] : "N/A",
        subtitle: topDept ? `${topDept[1]} employees` : "",
        color: "success" as const,
        icon: <Business sx={{ fontSize: 32 }} />,
      },
      {
        title: "Low Salary Range",
        value: stats.salaryRanges ? stats.salaryRanges["<50k"] || 0 : 0,
        subtitle: "Employees earning <₹50k",
        color: "warning" as const,
        icon: <Warning sx={{ fontSize: 32 }} />,
        trend: "-8%",
        trendUp: false,
      },
    ];
  }, [stats]);

  if (statsError) {
    showSnackbar("Failed to load dashboard data", "error");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section */}
        <Box
          sx={{
            mb: { xs: 3, sm: 4, md: 5 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Welcome Back! 👋
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Here's what's happening with your workforce today
          </Typography>
        </Box>

        {/* Loading State */}
        {statsLoading ? (
          <Fade in={statsLoading}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 12,
                gap: 2,
              }}
            >
              <CircularProgress size={48} thickness={4} />
              <Typography color="text.secondary">
                Loading dashboard data...
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Fade in={!statsLoading} timeout={500}>
            <Box>
              {/* Stats Cards Grid */}
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
              >
                {statsCards.map((card, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatsCard {...card} />
                  </Grid>
                ))}
              </Grid>

              {/* Charts Section */}
              {stats && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    mb: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    background: theme.palette.background.paper,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.08)`,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: { xs: 2, sm: 3 },
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    Analytics Overview
                  </Typography>
                  <DashboardCharts stats={stats} />
                </Paper>
              )}

              {/* Recent Employees Section */}
              {recentEmployees && recentEmployees.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 4,
                    background: theme.palette.background.paper,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.08)`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: { xs: 2, sm: 3 },
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1, sm: 0 },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      Recent Hires
                    </Typography>
                    <Chip
                      label={`${recentEmployees.length} new employees`}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                      icon={<TrendingUp />}
                    />
                  </Box>

                  <TableContainer>
                    <Table size={isMobile ? "small" : "medium"}>
                      <TableHead>
                        <TableRow
                          sx={{
                            backgroundColor: theme.palette.grey[50],
                            borderRadius: 2,
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600 }}>
                            Employee
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Department
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }} align="right">
                            Salary
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentEmployees.map((employee, index) => (
                          <TableRow
                            key={employee.id}
                            sx={{
                              "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                              },
                              transition: "background-color 0.2s",
                            }}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    bgcolor: theme.palette.primary.main,
                                    width: { xs: 32, sm: 40 },
                                    height: { xs: 32, sm: 40 },
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                  }}
                                >
                                  {employee.firstName?.charAt(0) || "?"}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500 }}
                                  >
                                    {employee.firstName}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    ID: {employee.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={employee.department}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.success.main,
                                }}
                              >
                                ₹{employee.salary?.toLocaleString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default DashboardPage;
