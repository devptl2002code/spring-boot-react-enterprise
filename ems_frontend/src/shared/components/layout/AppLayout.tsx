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

const DRAWER_OPEN_WIDTH = 240;
const DRAWER_CLOSED_WIDTH = 68;

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const muiTheme = useTheme();
  const isLight = mode === "light";

  // Desktop: collapsed/expanded
  const [collapsed, setCollapsed] = useState(false);
  // Mobile: drawer open/closed
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

  // ── Sidebar content (shared between permanent + temporary drawers) ──────────
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => {
    const open = mobile ? true : !collapsed;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          backgroundColor: isLight ? "#2b476e" : "#0f172a",
          transition: "width 0.25s ease",
        }}
      >
        {/* ── Logo + collapse toggle ────────────────────────────────── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "space-between" : "center",
            px: open ? 2 : 1,
            py: 2,
            minHeight: 64,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {open && (
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #e38e44, #fb923c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                E
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                }}
              >
                EMS Portal
              </Typography>
            </Box>
          )}

          {/* Collapse toggle — desktop only */}
          {!mobile && (
            <Tooltip
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              placement="right"
            >
              <IconButton
                onClick={() => setCollapsed((p) => !p)}
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: "7px",
                  width: 28,
                  height: 28,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#fff",
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

          {/* Mobile close button */}
          {mobile && (
            <IconButton
              onClick={() => setMobileOpen(false)}
              size="small"
              sx={{ color: "rgba(255,255,255,0.6)", ml: "auto" }}
            >
              <ChevronLeft sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>

        {/* ── Nav links ────────────────────────────────────────────── */}
        <List sx={{ px: open ? 1.5 : 0.75, pt: 1.5, flex: 1 }}>
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
                    color: active ? "#fff" : "rgba(255,255,255,0.65)",
                    backgroundColor: active
                      ? "#e38e44 !important"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: active
                        ? "#c2410c !important"
                        : "rgba(255,255,255,0.08) !important",
                      color: "#fff",
                    },
                    transition: "all 0.15s",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 32 : "unset",
                      color: active ? "#fff" : "rgba(255,255,255,0.55)",
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
                        backgroundColor: "#fff",
                        opacity: 0.8,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>

        <Divider
          sx={{ borderColor: "rgba(255,255,255,0.08)", mx: open ? 1.5 : 0.75 }}
        />

        {/* ── Bottom actions ───────────────────────────────────────── */}
        <Box
          sx={{
            px: open ? 1.5 : 0.75,
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          {/* Theme toggle */}
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
                color: "rgba(255,255,255,0.65)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                },
                transition: "all 0.15s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open ? 32 : "unset",
                  color: "rgba(255,255,255,0.55)",
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
                  primaryTypographyProps={{ fontSize: 14, noWrap: true }}
                />
              )}
            </ListItemButton>
          </Tooltip>

          {/* Logout */}
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
                color: "rgba(255,255,255,0.65)",
                "&:hover": {
                  backgroundColor: alpha("#e38e44", 0.2),
                  color: "#fb923c",
                },
                transition: "all 0.15s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open ? 32 : "unset",
                  color: "rgba(255,255,255,0.55)",
                  justifyContent: "center",
                }}
              >
                <Logout sx={{ fontSize: 18 }} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: 14, noWrap: true }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Box>

        {/* ── User pill ────────────────────────────────────────────── */}
        <Box
          sx={{
            px: open ? 1.5 : 0.75,
            pb: 2,
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: open ? 1.5 : 1,
              py: 1,
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.07)",
              justifyContent: open ? "flex-start" : "center",
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                background: "linear-gradient(135deg, #e38e44, #fb923c)",
              }}
            >
              {user?.role?.[0] ?? "U"}
            </Avatar>
            {open && (
              <Box minWidth={0}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    display: "block",
                    lineHeight: 1.2,
                    fontSize: 12,
                  }}
                  noWrap
                >
                  {user?.role ?? "User"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}
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
      {/* ── Desktop permanent sidebar ──────────────────────────────── */}
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

      {/* ── Mobile temporary drawer ────────────────────────────────── */}
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

      {/* ── Main content ──────────────────────────────────────────── */}
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
        {/* Mobile top bar (burger only) */}
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
              backgroundColor: alpha("#2b476e", 0.1),
              color: "#2b476e",
              borderRadius: "8px",
              "&:hover": { backgroundColor: alpha("#2b476e", 0.18) },
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: "7px",
              background: "linear-gradient(135deg, #e38e44, #fb923c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
              color: "#fff",
            }}
          >
            E
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="text.primary"
            fontSize={14}
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
