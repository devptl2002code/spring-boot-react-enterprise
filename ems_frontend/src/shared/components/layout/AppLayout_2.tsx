// import {
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   IconButton,
//   Tooltip,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import {
//   Dashboard,
//   People,
//   LightMode,
//   DarkMode,
//   Logout,
//   ChevronLeft,
//   ChevronRight,
//   Menu as MenuIcon,
// } from "@mui/icons-material";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "@features/auth/useAuth";
// import { useThemeMode } from "@core/theme";
// import { useState } from "react";
// import { alpha, useTheme } from "@mui/material/styles";

// const DRAWER_OPEN_WIDTH = 240;
// const DRAWER_CLOSED_WIDTH = 68;

// // Theme-aligned constants
// const SIDEBAR_BG        = "#0d1f17";   // deep forest (same as dark primary.dark)
// const SIDEBAR_BG_LIGHT  = "#1a3a2a";   // forest green for light mode
// const GOLD              = "#c9a84c";
// const GOLD_HOVER        = "#b8962e";
// const TEXT_DIM          = "rgba(240,236,224,0.55)";
// const TEXT_MID          = "rgba(240,236,224,0.7)";
// const TEXT_BRIGHT       = "#f0ece0";
// const DIVIDER_COLOR     = "rgba(201,168,76,0.12)";
// const ITEM_HOVER_BG     = "rgba(201,168,76,0.1)";
// const ITEM_ACTIVE_BG    = "rgba(201,168,76,0.18)";

// export const AppLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth();
//   const { mode, toggleTheme } = useThemeMode();
//   const muiTheme = useTheme();
//   const isLight = mode === "light";

//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const navItems = [
//     { label: "Dashboard", path: "/", icon: <Dashboard fontSize="small" /> },
//     ...(user?.role === "ADMIN" || user?.role === "HR"
//       ? [{ label: "Employees", path: "/employees", icon: <People fontSize="small" /> }]
//       : []),
//   ];

//   const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => {
//     const open = mobile ? true : !collapsed;

//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//           overflow: "hidden",
//           backgroundColor: isLight ? SIDEBAR_BG_LIGHT : SIDEBAR_BG,
//           transition: "width 0.25s ease",
//         }}
//       >
//         {/* ── Logo + collapse toggle ─────────────────────────────── */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: open ? "space-between" : "center",
//             px: open ? 2 : 1,
//             py: 2,
//             minHeight: 64,
//             borderBottom: `1px solid ${DIVIDER_COLOR}`,
//           }}
//         >
//           {open && (
//             <Box display="flex" alignItems="center" gap={1.5}>
//               {/* Logo mark — gold leaf square */}
//               <Box
//                 sx={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: "4px",
//                   background: `linear-gradient(135deg, ${GOLD}, #e8c97a)`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: 800,
//                   fontSize: 15,
//                   color: "#0d1f17",
//                   flexShrink: 0,
//                   boxShadow: `0 2px 8px rgba(201,168,76,0.35)`,
//                 }}
//               >
//                 E
//               </Box>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   color: TEXT_BRIGHT,
//                   fontWeight: 700,
//                   fontSize: 15,
//                   letterSpacing: "0.01em",
//                   fontFamily: '"Cormorant Garamond", Georgia, serif',
//                 }}
//               >
//                 EMS Portal
//               </Typography>
//             </Box>
//           )}

//           {/* Collapse toggle — desktop only */}
//           {!mobile && (
//             <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
//               <IconButton
//                 onClick={() => setCollapsed((p) => !p)}
//                 size="small"
//                 sx={{
//                   color: TEXT_DIM,
//                   backgroundColor: "rgba(201,168,76,0.08)",
//                   borderRadius: "4px",
//                   width: 28,
//                   height: 28,
//                   "&:hover": {
//                     backgroundColor: "rgba(201,168,76,0.18)",
//                     color: GOLD,
//                   },
//                 }}
//               >
//                 {collapsed
//                   ? <ChevronRight sx={{ fontSize: 16 }} />
//                   : <ChevronLeft sx={{ fontSize: 16 }} />}
//               </IconButton>
//             </Tooltip>
//           )}

//           {/* Mobile close */}
//           {mobile && (
//             <IconButton
//               onClick={() => setMobileOpen(false)}
//               size="small"
//               sx={{ color: TEXT_DIM, ml: "auto" }}
//             >
//               <ChevronLeft sx={{ fontSize: 18 }} />
//             </IconButton>
//           )}
//         </Box>

//         {/* ── Nav links ──────────────────────────────────────────── */}
//         <List sx={{ px: open ? 1.5 : 0.75, pt: 1.5, flex: 1 }}>
//           {navItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Tooltip key={item.path} title={!open ? item.label : ""} placement="right" arrow>
//                 <ListItemButton
//                   selected={active}
//                   onClick={() => {
//                     navigate(item.path);
//                     if (mobile) setMobileOpen(false);
//                   }}
//                   sx={{
//                     borderRadius: "4px",
//                     mb: 0.5,
//                     py: 1,
//                     px: open ? 1.5 : 1,
//                     justifyContent: open ? "flex-start" : "center",
//                     minHeight: 44,
//                     color: active ? GOLD : TEXT_MID,
//                     backgroundColor: active ? `${ITEM_ACTIVE_BG} !important` : "transparent",
//                     borderLeft: active ? `2px solid ${GOLD}` : "2px solid transparent",
//                     "&:hover": {
//                       backgroundColor: `${ITEM_HOVER_BG} !important`,
//                       color: TEXT_BRIGHT,
//                     },
//                     transition: "all 0.15s",
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: open ? 32 : "unset",
//                       color: active ? GOLD : TEXT_DIM,
//                       justifyContent: "center",
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>
//                   {open && (
//                     <ListItemText
//                       primary={item.label}
//                       primaryTypographyProps={{
//                         fontSize: 14,
//                         fontWeight: active ? 600 : 400,
//                         fontFamily: '"DM Sans", sans-serif',
//                         noWrap: true,
//                       }}
//                     />
//                   )}
//                   {/* Active dot */}
//                   {open && active && (
//                     <Box
//                       sx={{
//                         width: 5,
//                         height: 5,
//                         borderRadius: "50%",
//                         backgroundColor: GOLD,
//                         opacity: 0.9,
//                       }}
//                     />
//                   )}
//                 </ListItemButton>
//               </Tooltip>
//             );
//           })}
//         </List>

//         <Divider sx={{ borderColor: DIVIDER_COLOR, mx: open ? 1.5 : 0.75 }} />

//         {/* ── Bottom actions ─────────────────────────────────────── */}
//         <Box sx={{ px: open ? 1.5 : 0.75, py: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
//           {/* Theme toggle */}
//           <Tooltip title={isLight ? "Switch to Dark" : "Switch to Light"} placement="right" arrow>
//             <ListItemButton
//               onClick={toggleTheme}
//               sx={{
//                 borderRadius: "4px",
//                 py: 1,
//                 px: open ? 1.5 : 1,
//                 justifyContent: open ? "flex-start" : "center",
//                 minHeight: 44,
//                 color: TEXT_MID,
//                 borderLeft: "2px solid transparent",
//                 "&:hover": {
//                   backgroundColor: ITEM_HOVER_BG,
//                   color: TEXT_BRIGHT,
//                 },
//                 transition: "all 0.15s",
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: open ? 32 : "unset", color: TEXT_DIM, justifyContent: "center" }}>
//                 {isLight
//                   ? <DarkMode sx={{ fontSize: 18 }} />
//                   : <LightMode sx={{ fontSize: 18 }} />}
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary={isLight ? "Dark Mode" : "Light Mode"}
//                   primaryTypographyProps={{ fontSize: 14, fontFamily: '"DM Sans", sans-serif', noWrap: true }}
//                 />
//               )}
//             </ListItemButton>
//           </Tooltip>

//           {/* Logout */}
//           <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
//             <ListItemButton
//               onClick={async () => {
//                 await logout();
//                 navigate("/login");
//               }}
//               sx={{
//                 borderRadius: "4px",
//                 py: 1,
//                 px: open ? 1.5 : 1,
//                 justifyContent: open ? "flex-start" : "center",
//                 minHeight: 44,
//                 color: TEXT_MID,
//                 borderLeft: "2px solid transparent",
//                 "&:hover": {
//                   backgroundColor: "rgba(201,168,76,0.12)",
//                   color: GOLD,
//                   borderLeft: `2px solid ${GOLD}`,
//                 },
//                 transition: "all 0.15s",
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: open ? 32 : "unset", color: TEXT_DIM, justifyContent: "center" }}>
//                 <Logout sx={{ fontSize: 18 }} />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Logout"
//                   primaryTypographyProps={{ fontSize: 14, fontFamily: '"DM Sans", sans-serif', noWrap: true }}
//                 />
//               )}
//             </ListItemButton>
//           </Tooltip>
//         </Box>

//         {/* ── User pill ──────────────────────────────────────────── */}
//         <Box sx={{ px: open ? 1.5 : 0.75, pb: 2, pt: 0.5 }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               px: open ? 1.5 : 1,
//               py: 1,
//               borderRadius: "4px",
//               backgroundColor: "rgba(201,168,76,0.07)",
//               border: `1px solid ${DIVIDER_COLOR}`,
//               justifyContent: open ? "flex-start" : "center",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 28,
//                 height: 28,
//                 fontSize: 11,
//                 fontWeight: 700,
//                 flexShrink: 0,
//                 background: `linear-gradient(135deg, ${GOLD}, #e8c97a)`,
//                 color: "#0d1f17",
//               }}
//             >
//               {user?.role?.[0] ?? "U"}
//             </Avatar>
//             {open && (
//               <Box minWidth={0}>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: TEXT_BRIGHT,
//                     fontWeight: 600,
//                     display: "block",
//                     lineHeight: 1.2,
//                     fontSize: 12,
//                     fontFamily: '"DM Sans", sans-serif',
//                   }}
//                   noWrap
//                 >
//                   {user?.role ?? "User"}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{ color: TEXT_DIM, fontSize: 10, fontFamily: '"DM Sans", sans-serif' }}
//                 >
//                   Active session
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     );
//   };

//   const drawerWidth = collapsed ? DRAWER_CLOSED_WIDTH : DRAWER_OPEN_WIDTH;

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* ── Desktop permanent sidebar ──────────────────────────── */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", sm: "block" },
//           width: drawerWidth,
//           flexShrink: 0,
//           transition: "width 0.25s ease",
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             overflowX: "hidden",
//             border: "none",
//             transition: "width 0.25s ease",
//           },
//         }}
//       >
//         <SidebarContent />
//       </Drawer>

//       {/* ── Mobile temporary drawer ────────────────────────────── */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": { width: DRAWER_OPEN_WIDTH, border: "none" },
//         }}
//       >
//         <SidebarContent mobile />
//       </Drawer>

//       {/* ── Main content ───────────────────────────────────────── */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           minHeight: "100vh",
//           backgroundColor: "background.default",
//           transition: "background-color 0.3s ease",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Mobile top bar */}
//         <Box
//           sx={{
//             display: { xs: "flex", sm: "none" },
//             alignItems: "center",
//             gap: 1.5,
//             px: 2,
//             py: 1.5,
//             borderBottom: `1px solid ${muiTheme.palette.divider}`,
//             backgroundColor: "background.paper",
//             position: "sticky",
//             top: 0,
//             zIndex: 100,
//           }}
//         >
//           <IconButton
//             onClick={() => setMobileOpen(true)}
//             size="small"
//             sx={{
//               backgroundColor: alpha(SIDEBAR_BG_LIGHT, 0.1),
//               color: SIDEBAR_BG_LIGHT,
//               borderRadius: "4px",
//               "&:hover": { backgroundColor: alpha(SIDEBAR_BG_LIGHT, 0.18) },
//             }}
//           >
//             <MenuIcon sx={{ fontSize: 20 }} />
//           </IconButton>
//           <Box
//             sx={{
//               width: 26,
//               height: 26,
//               borderRadius: "4px",
//               background: `linear-gradient(135deg, ${GOLD}, #e8c97a)`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: 800,
//               fontSize: 13,
//               color: "#0d1f17",
//             }}
//           >
//             E
//           </Box>
//           <Typography
//             variant="subtitle1"
//             fontWeight={700}
//             color="text.primary"
//             fontSize={14}
//             sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: "0.01em" }}
//           >
//             EMS Portal
//           </Typography>
//         </Box>

//         {/* Page content */}
//         <Box sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };