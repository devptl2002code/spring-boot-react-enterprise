// import { createTheme, PaletteMode, ThemeProvider as MuiThemeProvider } from "@mui/material";
// import { createContext, useContext, useMemo, useState, ReactNode } from "react";

// export const createAppTheme = (mode: PaletteMode) => {
//   const isLight = mode === "light";

//   return createTheme({
//     palette: {
//       mode,
//       primary: {
//         main: "#1b1f3b",         // Deep navy
//         light: "#2d3263",
//         dark: "#0d1024",
//         contrastText: "#f0efff",
//       },
//       secondary: {
//         main: "#e8445a",         // Rose coral accent
//         light: "#ff6b7a",
//         dark: "#c02040",
//         contrastText: "#ffffff",
//       },
//       background: {
//         default: isLight ? "#f4f3ff" : "#0d1024",   // Soft lavender / deep navy
//         paper:   isLight ? "#ffffff" : "#161a35",
//       },
//       text: {
//         primary:   isLight ? "#0d1024" : "#e8e6ff",
//         secondary: isLight ? "#4a4870" : "#9896c8",
//       },
//       divider: isLight ? "#dddcf5" : "#252850",
//       grey: {
//         50:  "#f4f3ff",
//         100: "#eae9ff",
//         200: "#d5d3f7",
//         300: "#b8b6e8",
//         400: "#9896c8",
//         500: "#6e6ca0",
//         600: "#4a4870",
//         700: "#2d2b50",
//         800: "#161a35",
//         900: "#0d1024",
//       },
//     },

//     typography: {
//       fontFamily: '"Outfit", "Helvetica Neue", "Arial", sans-serif',
//       h1: { fontSize: "2.5rem",  fontWeight: 700, letterSpacing: "-0.03em" },
//       h2: { fontSize: "2rem",    fontWeight: 700, letterSpacing: "-0.025em" },
//       h3: { fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" },
//       h4: { fontSize: "1.5rem",  fontWeight: 700, letterSpacing: "-0.015em" },
//       h5: { fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.01em" },
//       h6: { fontSize: "1.1rem",  fontWeight: 600 },
//       body1: { fontSize: "0.9375rem", lineHeight: 1.65 },
//       body2: { fontSize: "0.875rem",  lineHeight: 1.6 },
//       button: { fontWeight: 600, letterSpacing: "0.02em" },
//     },

//     shape: { borderRadius: 12 },

//     components: {
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             backgroundColor: isLight ? "#1b1f3b" : "#0d1024",
//             color: "#e8e6ff",
//             boxShadow: "none",
//             borderBottom: `1px solid ${isLight ? "rgba(232,68,90,0.2)" : "rgba(232,68,90,0.15)"}`,
//           },
//         },
//       },

//       MuiDrawer: {
//         styleOverrides: {
//           paper: {
//             backgroundColor: isLight ? "#1b1f3b" : "#0d1024",
//             color: "#e8e6ff",
//             borderRight: "none",
//             boxShadow: isLight
//               ? "4px 0 24px rgba(27,31,59,0.18)"
//               : "4px 0 24px rgba(0,0,0,0.5)",
//           },
//         },
//       },

//       MuiCard: {
//         styleOverrides: {
//           root: {
//             backgroundColor: isLight ? "#ffffff" : "#161a35",
//             border: `1px solid ${isLight ? "#dddcf5" : "#252850"}`,
//             boxShadow: isLight
//               ? "0 2px 12px rgba(27,31,59,0.08)"
//               : "0 2px 16px rgba(0,0,0,0.4)",
//             borderRadius: 14,
//           },
//         },
//       },

//       MuiPaper: {
//         styleOverrides: { root: { backgroundImage: "none" } },
//       },

//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               backgroundColor: isLight ? "#faf9ff" : "rgba(13,16,36,0.6)",
//               color: isLight ? "#0d1024" : "#e8e6ff",
//               borderRadius: 10,
//               "& fieldset": {
//                 borderColor: isLight ? "#d5d3f7" : "#252850",
//               },
//               "&:hover fieldset": { borderColor: "#7c6ff7" },
//               "&.Mui-focused fieldset": { borderColor: "#7c6ff7", borderWidth: "1.5px" },
//               "& input:-webkit-autofill": {
//                 WebkitBoxShadow: isLight
//                   ? "0 0 0 100px #faf9ff inset"
//                   : "0 0 0 100px rgba(13,16,36,0.95) inset",
//                 WebkitTextFillColor: isLight ? "#0d1024" : "#e8e6ff",
//                 caretColor: isLight ? "#0d1024" : "#e8e6ff",
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: isLight ? "#6e6ca0" : "#6e6ca0",
//               "&.Mui-focused": { color: "#7c6ff7" },
//             },
//           },
//         },
//       },

//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: "none",
//             fontWeight: 600,
//             borderRadius: 10,
//           },
//           containedPrimary: {
//             background: "linear-gradient(135deg, #7c6ff7 0%, #e8445a 100%)",
//             color: "#ffffff",
//             boxShadow: "0 4px 16px rgba(124,111,247,0.35)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #6a5de0 0%, #c02040 100%)",
//               boxShadow: "0 6px 22px rgba(124,111,247,0.45)",
//             },
//           },
//           outlinedPrimary: {
//             borderColor: isLight ? "#d5d3f7" : "#252850",
//             color: isLight ? "#4a4870" : "#9896c8",
//             "&:hover": {
//               borderColor: "#7c6ff7",
//               color: "#7c6ff7",
//               backgroundColor: "rgba(124,111,247,0.06)",
//             },
//           },
//           textPrimary: {
//             color: isLight ? "#4a4870" : "#9896c8",
//             "&:hover": {
//               color: "#7c6ff7",
//               backgroundColor: "rgba(124,111,247,0.06)",
//             },
//           },
//         },
//       },

//       MuiIconButton: {
//         styleOverrides: {
//           root: {
//             transition: "color 0.2s, background-color 0.2s",
//             "&:hover": {
//               color: "#7c6ff7",
//               backgroundColor: "rgba(124,111,247,0.08)",
//             },
//           },
//         },
//       },

//       MuiTableCell: {
//         styleOverrides: {
//           root: {
//             borderBottom: `1px solid ${isLight ? "#dddcf5" : "rgba(37,40,80,0.8)"}`,
//           },
//           head: {
//             backgroundColor: isLight ? "#f4f3ff" : "#0d1024",
//             color: isLight ? "#6e6ca0" : "#6e6ca0",
//             fontWeight: 700,
//             fontSize: 11,
//             textTransform: "uppercase",
//             letterSpacing: "0.1em",
//           },
//         },
//       },

//       MuiTableRow: {
//         styleOverrides: {
//           root: {
//             "&:hover": {
//               backgroundColor: isLight
//                 ? "rgba(124,111,247,0.04)"
//                 : "rgba(124,111,247,0.07)",
//             },
//             "&:last-child td": { borderBottom: "none" },
//           },
//         },
//       },

//       MuiListItemButton: {
//         styleOverrides: {
//           root: {
//             color: "rgba(232,230,255,0.6)",
//             borderRadius: 10,
//             "&:hover": {
//               backgroundColor: "rgba(124,111,247,0.14)",
//               color: "#e8e6ff",
//             },
//             "&.Mui-selected": {
//               background: "linear-gradient(135deg, rgba(124,111,247,0.25), rgba(232,68,90,0.15))",
//               color: "#c4bfff",
//               borderLeft: "2px solid #7c6ff7",
//               "&:hover": {
//                 background: "linear-gradient(135deg, rgba(124,111,247,0.32), rgba(232,68,90,0.2))",
//               },
//             },
//           },
//         },
//       },

//       MuiChip: {
//         styleOverrides: {
//           root: { fontWeight: 600, fontSize: 11, borderRadius: 6 },
//         },
//       },

//       MuiDialog: {
//         styleOverrides: {
//           paper: {
//             border: `1px solid ${isLight ? "#dddcf5" : "#252850"}`,
//             boxShadow: isLight
//               ? "0 24px 64px rgba(27,31,59,0.15)"
//               : "0 24px 64px rgba(0,0,0,0.55)",
//             borderRadius: 14,
//           },
//         },
//       },

//       MuiDivider: {
//         styleOverrides: {
//           root: { borderColor: isLight ? "#dddcf5" : "#252850" },
//         },
//       },

//       MuiTooltip: {
//         styleOverrides: {
//           tooltip: {
//             backgroundColor: isLight ? "#1b1f3b" : "#0d1024",
//             color: "#e8e6ff",
//             fontSize: 12,
//             border: "1px solid rgba(124,111,247,0.25)",
//             borderRadius: 8,
//           },
//         },
//       },
//     },
//   });
// };

// export const theme = createAppTheme("dark");

// interface ThemeContextType {
//   mode: PaletteMode;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType>({
//   mode: "light",
//   toggleTheme: () => {},
// });

// export const useThemeMode = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [mode, setMode] = useState<PaletteMode>(() => {
//     return (localStorage.getItem("themeMode") as PaletteMode) ?? "light";
//   });

//   const toggleTheme = () => {
//     setMode((prev) => {
//       const next = prev === "light" ? "dark" : "light";
//       localStorage.setItem("themeMode", next);
//       return next;
//     });
//   };

//   const muiTheme = useMemo(() => createAppTheme(mode), [mode]);

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
//     </ThemeContext.Provider>
//   );
// };