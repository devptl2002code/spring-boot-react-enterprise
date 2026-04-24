// import { createTheme, PaletteMode, ThemeProvider as MuiThemeProvider } from "@mui/material";
// import { createContext, useContext, useMemo, useState, ReactNode } from "react";

// export const createAppTheme = (mode: PaletteMode) => {
//   const isLight = mode === "light";

//   return createTheme({
//     palette: {
//       mode,
//       primary: {
//         main: "#1a3a2a",        // Deep forest green
//         light: "#2d6a4f",
//         dark: "#0d1f17",
//         contrastText: "#f5f0e8",
//       },
//       secondary: {
//         main: "#c9a84c",        // Warm antique gold
//         light: "#e8c97a",
//         dark: "#9a7a2e",
//         contrastText: "#0d1f17",
//       },
//       background: {
//         default: isLight ? "#f5f0e8" : "#0d1f17",   // Warm parchment / deep forest
//         paper:   isLight ? "#fffdf7" : "#162a1f",
//       },
//       text: {
//         primary:   isLight ? "#0d1f17" : "#f0ece0",
//         secondary: isLight ? "#4a6358" : "#9ab8a6",
//       },
//       divider: isLight ? "#d8cdb4" : "#264033",
//       grey: {
//         50:  "#f9f6ef",
//         100: "#f0ece0",
//         200: "#ddd8c4",
//         300: "#c4bea6",
//         400: "#9a9480",
//         500: "#6e6a58",
//         600: "#4a4636",
//         700: "#2e2c22",
//         800: "#1c1a14",
//         900: "#0d0c09",
//       },
//     },

//     typography: {
//       fontFamily: '"Cormorant Garamond", "Georgia", "Times New Roman", serif',
//       h1: { fontSize: "2.75rem", fontWeight: 600, letterSpacing: "-0.02em" },
//       h2: { fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-0.015em" },
//       h3: { fontSize: "1.875rem", fontWeight: 600, letterSpacing: "-0.01em" },
//       h4: { fontSize: "1.5rem",   fontWeight: 600 },
//       h5: { fontSize: "1.25rem",  fontWeight: 600 },
//       h6: { fontSize: "1.125rem", fontWeight: 600 },
//       body1: {
//         fontFamily: '"DM Sans", "Helvetica Neue", "Arial", sans-serif',
//         fontSize: "0.9375rem",
//         lineHeight: 1.65,
//       },
//       body2: {
//         fontFamily: '"DM Sans", "Helvetica Neue", "Arial", sans-serif',
//         fontSize: "0.875rem",
//         lineHeight: 1.6,
//       },
//       button: {
//         fontFamily: '"DM Sans", "Helvetica Neue", "Arial", sans-serif',
//         fontWeight: 500,
//         letterSpacing: "0.04em",
//       },
//       caption: {
//         fontFamily: '"DM Sans", "Helvetica Neue", "Arial", sans-serif',
//         fontSize: "0.75rem",
//       },
//     },

//     shape: { borderRadius: 4 },   // More angular / refined

//     components: {
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             backgroundColor: isLight ? "#1a3a2a" : "#0d1f17",
//             color: "#f0ece0",
//             boxShadow: isLight
//               ? "0 1px 0 rgba(201,168,76,0.3)"
//               : "0 1px 0 rgba(201,168,76,0.15)",
//             borderBottom: "1px solid rgba(201,168,76,0.2)",
//           },
//         },
//       },

//       MuiDrawer: {
//         styleOverrides: {
//           paper: {
//             backgroundColor: isLight ? "#0d1f17" : "#0a1810",
//             color: "#f0ece0",
//             borderRight: "1px solid rgba(201,168,76,0.15)",
//             boxShadow: isLight
//               ? "2px 0 16px rgba(13,31,23,0.25)"
//               : "2px 0 16px rgba(0,0,0,0.5)",
//           },
//         },
//       },

//       MuiCard: {
//         styleOverrides: {
//           root: {
//             backgroundColor: isLight ? "#fffdf7" : "#162a1f",
//             border: `1px solid ${isLight ? "#ddd8c4" : "#264033"}`,
//             boxShadow: isLight
//               ? "0 2px 8px rgba(13,31,23,0.07)"
//               : "0 2px 12px rgba(0,0,0,0.35)",
//             borderRadius: 6,
//           },
//         },
//       },

//       MuiPaper: {
//         styleOverrides: {
//           root: { backgroundImage: "none" },
//         },
//       },

//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               backgroundColor: isLight ? "#fffdf7" : "transparent",
//               color: isLight ? "#0d1f17" : "#f0ece0",
//               borderRadius: 4,
//               "& fieldset": {
//                 borderColor: isLight ? "#c4bea6" : "#264033",
//               },
//               "&:hover fieldset": {
//                 borderColor: "#c9a84c",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "#c9a84c",
//                 borderWidth: "1.5px",
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: isLight ? "#4a6358" : "#9ab8a6",
//               "&.Mui-focused": { color: "#c9a84c" },
//             },
//             "& .MuiSelect-icon": {
//               color: isLight ? "#4a6358" : "#9ab8a6",
//             },
//           },
//         },
//       },

//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: "none",
//             fontWeight: 500,
//             borderRadius: 4,
//             letterSpacing: "0.04em",
//           },
//           containedPrimary: {
//             backgroundColor: "#c9a84c",
//             color: "#0d1f17",
//             boxShadow: "0 2px 10px rgba(201,168,76,0.3)",
//             "&:hover": {
//               backgroundColor: "#b8962e",
//               boxShadow: "0 4px 16px rgba(201,168,76,0.4)",
//             },
//           },
//           outlinedPrimary: {
//             borderColor: isLight ? "#c4bea6" : "#264033",
//             color: isLight ? "#4a6358" : "#9ab8a6",
//             "&:hover": {
//               borderColor: "#c9a84c",
//               color: "#c9a84c",
//               backgroundColor: "rgba(201,168,76,0.06)",
//             },
//           },
//           textPrimary: {
//             color: isLight ? "#2d6a4f" : "#9ab8a6",
//             "&:hover": {
//               color: "#c9a84c",
//               backgroundColor: "rgba(201,168,76,0.06)",
//             },
//           },
//         },
//       },

//       MuiIconButton: {
//         styleOverrides: {
//           root: {
//             transition: "color 0.2s, background-color 0.2s",
//             "&:hover": {
//               color: "#c9a84c",
//               backgroundColor: "rgba(201,168,76,0.08)",
//             },
//           },
//         },
//       },

//       MuiTableCell: {
//         styleOverrides: {
//           root: {
//             borderBottom: `1px solid ${isLight ? "#ddd8c4" : "rgba(38,64,51,0.8)"}`,
//             fontFamily: '"DM Sans", sans-serif',
//           },
//           head: {
//             backgroundColor: isLight ? "#f5f0e8" : "#0d1f17",
//             color: isLight ? "#4a6358" : "#6e9480",
//             fontWeight: 600,
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
//                 ? "rgba(201,168,76,0.05)"
//                 : "rgba(201,168,76,0.07)",
//             },
//             "&:last-child td": { borderBottom: "none" },
//           },
//         },
//       },

//       MuiListItemButton: {
//         styleOverrides: {
//           root: {
//             color: "rgba(240,236,224,0.65)",
//             borderRadius: 4,
//             "&:hover": {
//               backgroundColor: "rgba(201,168,76,0.12)",
//               color: "#f0ece0",
//             },
//             "&.Mui-selected": {
//               backgroundColor: "rgba(201,168,76,0.2)",
//               color: "#c9a84c",
//               borderLeft: "2px solid #c9a84c",
//               "&:hover": {
//                 backgroundColor: "rgba(201,168,76,0.28)",
//               },
//             },
//           },
//         },
//       },

//       MuiChip: {
//         styleOverrides: {
//           root: {
//             fontFamily: '"DM Sans", sans-serif',
//             fontWeight: 500,
//             fontSize: 11,
//             letterSpacing: "0.03em",
//             borderRadius: 4,
//           },
//         },
//       },

//       MuiDialog: {
//         styleOverrides: {
//           paper: {
//             border: `1px solid ${isLight ? "#ddd8c4" : "#264033"}`,
//             boxShadow: isLight
//               ? "0 24px 64px rgba(13,31,23,0.18)"
//               : "0 24px 64px rgba(0,0,0,0.55)",
//             borderRadius: 6,
//           },
//         },
//       },

//       MuiDivider: {
//         styleOverrides: {
//           root: {
//             borderColor: isLight ? "#ddd8c4" : "#264033",
//           },
//         },
//       },

//       MuiTooltip: {
//         styleOverrides: {
//           tooltip: {
//             backgroundColor: isLight ? "#1a3a2a" : "#0d1f17",
//             color: "#f0ece0",
//             fontSize: 12,
//             fontFamily: '"DM Sans", sans-serif',
//             border: "1px solid rgba(201,168,76,0.2)",
//             borderRadius: 4,
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