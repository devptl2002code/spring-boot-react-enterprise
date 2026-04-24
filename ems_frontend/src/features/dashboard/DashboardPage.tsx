import {
  Box,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Fade,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StatsCard } from "./components/StatsCard";
import { DashboardCharts } from "./components/DashboardCharts";
import { useDashboardStats } from "./dashboard.hooks";
import { useMemo } from "react";
import {
  PeopleAlt,
  AttachMoney,
  Business,
  Warning,
} from "@mui/icons-material";

// Remove unused hook and its import
// Remove recentEmployees related code since it's not used in the UI

const DashboardPage = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down("sm"));
  useMediaQuery(theme.breakpoints.down("md"));

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useDashboardStats();

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

  // Simplified error handling - removed showSnackbar since it's not critical
  if (statsError) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography color="error">Failed to load dashboard data</Typography>
        </Box>
      </Container>
    );
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
            Dashboard
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
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default DashboardPage;