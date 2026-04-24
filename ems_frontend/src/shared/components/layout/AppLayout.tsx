import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  People,
  LightMode,
  DarkMode,
  Logout,
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@features/auth/useAuth";
import { useThemeMode } from "@core/theme";
import { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";

const DRAWER_OPEN_WIDTH = 248;
const DRAWER_CLOSED_WIDTH = 68;

const SLATE = "#1e2a3a";
const SLATE_LIGHT = "#2e4057";
const TEAL = "#0ea5a0";
const TEAL_LIGHT = "#2cc8c3";
const TEXT_BRIGHT = "#ffffff";
const TEXT_MID = "rgba(255,255,255,0.65)";
const TEXT_DIM = "rgba(255,255,255,0.38)";
const DIVIDER = "rgba(255,255,255,0.08)";
const HOVER_BG = "rgba(255,255,255,0.07)";
const ACTIVE_BG = "rgba(14,165,160,0.18)";

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const muiTheme = useTheme();
  const isLight = mode === "light";

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/", icon: <Dashboard fontSize="small" /> },
    ...(user?.role === "ADMIN" || user?.role === "HR"
      ? [
          {
            label: "Employees",
            path: "/employees",
            icon: <People fontSize="small" />,
          },
        ]
      : []),
  ];

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => {
    const open = mobile ? true : !collapsed;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          backgroundColor: isLight ? SLATE : "#111820",
          transition: "width 0.25s ease",
        }}
      >
        {/* ── Logo + collapse toggle ───────────────────────────── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "space-between" : "center",
            px: open ? 2.5 : 1,
            py: 2,
            minHeight: 64,
            borderBottom: `1px solid ${DIVIDER}`,
          }}
        >
          {open && (
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "9px",
                  backgroundColor: TEAL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                  flexShrink: 0,
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  boxShadow: "0 2px 8px rgba(14,165,160,0.4)",
                }}
              >
                E
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: TEXT_BRIGHT,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                EMS Portal
              </Typography>
            </Box>
          )}

          {!mobile && (
            <Tooltip
              title={collapsed ? "Expand" : "Collapse"}
              placement="right"
            >
              <IconButton
                onClick={() => setCollapsed((p) => !p)}
                size="small"
                sx={{
                  color: TEXT_DIM,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: "7px",
                  width: 28,
                  height: 28,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: TEXT_BRIGHT,
                  },
                }}
              >
                {collapsed ? (
                  <ChevronRight sx={{ fontSize: 16 }} />
                ) : (
                  <ChevronLeft sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Tooltip>
          )}

          {mobile && (
            <IconButton
              onClick={() => setMobileOpen(false)}
              size="small"
              sx={{ color: TEXT_DIM, ml: "auto" }}
            >
              <ChevronLeft sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>

        {/* ── Nav section label ────────────────────────────────── */}
        {open && (
          <Typography
            sx={{
              px: 2.5,
              pt: 2,
              pb: 0.5,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: TEXT_DIM,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            Main Menu
          </Typography>
        )}

        {/* ── Nav links ────────────────────────────────────────── */}
        <List sx={{ px: open ? 1.5 : 0.75, pt: 0.5, flex: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Tooltip
                key={item.path}
                title={!open ? item.label : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  selected={active}
                  onClick={() => {
                    navigate(item.path);
                    if (mobile) setMobileOpen(false);
                  }}
                  sx={{
                    borderRadius: "8px",
                    mb: 0.5,
                    py: 1,
                    px: open ? 1.5 : 1,
                    justifyContent: open ? "flex-start" : "center",
                    minHeight: 44,
                    color: active ? TEAL_LIGHT : TEXT_MID,
                    backgroundColor: active
                      ? `${ACTIVE_BG} !important`
                      : "transparent",
                    borderLeft: active
                      ? `2px solid ${TEAL}`
                      : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: `${HOVER_BG} !important`,
                      color: TEXT_BRIGHT,
                    },
                    transition: "all 0.15s",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 32 : "unset",
                      color: active ? TEAL : TEXT_DIM,
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: active ? 600 : 400,
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        noWrap: true,
                      }}
                    />
                  )}
                  {open && active && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: TEAL,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>

        <Divider sx={{ borderColor: DIVIDER, mx: open ? 1.5 : 0.75 }} />

        {/* ── Bottom actions ───────────────────────────────────── */}
        <Box
          sx={{
            px: open ? 1.5 : 0.75,
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Tooltip
            title={isLight ? "Switch to Dark" : "Switch to Light"}
            placement="right"
            arrow
          >
            <ListItemButton
              onClick={toggleTheme}
              sx={{
                borderRadius: "8px",
                py: 1,
                px: open ? 1.5 : 1,
                justifyContent: open ? "flex-start" : "center",
                minHeight: 44,
                color: TEXT_MID,
                borderLeft: "2px solid transparent",
                "&:hover": { backgroundColor: HOVER_BG, color: TEXT_BRIGHT },
                transition: "all 0.15s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open ? 32 : "unset",
                  color: TEXT_DIM,
                  justifyContent: "center",
                }}
              >
                {isLight ? (
                  <DarkMode sx={{ fontSize: 18 }} />
                ) : (
                  <LightMode sx={{ fontSize: 18 }} />
                )}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={isLight ? "Dark Mode" : "Light Mode"}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    noWrap: true,
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>

          <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
            <ListItemButton
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
              sx={{
                borderRadius: "8px",
                py: 1,
                px: open ? 1.5 : 1,
                justifyContent: open ? "flex-start" : "center",
                minHeight: 44,
                color: TEXT_MID,
                borderLeft: "2px solid transparent",
                "&:hover": {
                  backgroundColor: "rgba(239,68,68,0.1)",
                  color: "#fca5a5",
                  borderLeft: "2px solid #ef4444",
                },
                transition: "all 0.15s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open ? 32 : "unset",
                  color: TEXT_DIM,
                  justifyContent: "center",
                }}
              >
                <Logout sx={{ fontSize: 18 }} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    noWrap: true,
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Box>

        {/* ── User pill ────────────────────────────────────────── */}
        <Box sx={{ px: open ? 1.5 : 0.75, pb: 2.5, pt: 0.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: open ? 1.5 : 1,
              py: 1.25,
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
              justifyContent: open ? "flex-start" : "center",
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
                backgroundColor: TEAL,
                color: "#fff",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
              }}
            >
              {user?.role?.[0] ?? "U"}
            </Avatar>
            {open && (
              <Box minWidth={0}>
                <Typography
                  variant="caption"
                  sx={{
                    color: TEXT_BRIGHT,
                    fontWeight: 600,
                    display: "block",
                    lineHeight: 1.3,
                    fontSize: 12,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                  noWrap
                >
                  {user?.role ?? "User"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: TEXT_DIM,
                    fontSize: 10,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Active session
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const drawerWidth = collapsed ? DRAWER_CLOSED_WIDTH : DRAWER_OPEN_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* ── Desktop permanent sidebar ─────────────────────────── */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          transition: "width 0.25s ease",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            overflowX: "hidden",
            border: "none",
            transition: "width 0.25s ease",
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* ── Mobile temporary drawer ───────────────────────────── */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_OPEN_WIDTH, border: "none" },
        }}
      >
        <SidebarContent mobile />
      </Drawer>

      {/* ── Main content ──────────────────────────────────────── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "background.default",
          transition: "background-color 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Mobile top bar */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${muiTheme.palette.divider}`,
            backgroundColor: "background.paper",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <IconButton
            onClick={() => setMobileOpen(true)}
            size="small"
            sx={{
              backgroundColor: alpha(SLATE, 0.08),
              color: SLATE,
              borderRadius: "8px",
              "&:hover": { backgroundColor: alpha(SLATE, 0.14) },
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              backgroundColor: TEAL,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "#fff",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            E
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="text.primary"
            fontSize={14}
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              letterSpacing: "-0.01em",
            }}
          >
            EMS Portal
          </Typography>
        </Box>

        {/* Page content */}
        <Box sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
