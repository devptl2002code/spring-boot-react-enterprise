import {
  createTheme,
  PaletteMode,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export const createAppTheme = (mode: PaletteMode) => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1e2a3a", // Deep slate — sidebar, headings
        light: "#2e4057",
        dark: "#111820",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#0ea5a0", // Crisp teal — CTA, active states
        light: "#2cc8c3",
        dark: "#0b8580",
        contrastText: "#ffffff",
      },
      background: {
        default: isLight ? "#f7f8fa" : "#111820", // Off-white / deep slate
        paper: isLight ? "#ffffff" : "#1a2333",
      },
      text: {
        primary: isLight ? "#1e2a3a" : "#e8edf2",
        secondary: isLight ? "#5a6a7a" : "#8a9bb0",
      },
      divider: isLight ? "#e4e8ed" : "#243040",
      grey: {
        50: "#f7f8fa",
        100: "#eef0f4",
        200: "#e4e8ed",
        300: "#cdd4dc",
        400: "#a0adb8",
        500: "#6e7f90",
        600: "#5a6a7a",
        700: "#3d4f60",
        800: "#1a2333",
        900: "#111820",
      },
    },

    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", "Helvetica Neue", sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" },
      h2: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.015em" },
      h4: { fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em" },
      h5: { fontSize: "1.25rem", fontWeight: 600 },
      h6: { fontSize: "1.1rem", fontWeight: 600 },
      body1: { fontSize: "0.9375rem", lineHeight: 1.7 },
      body2: { fontSize: "0.875rem", lineHeight: 1.65 },
      button: { fontWeight: 600, letterSpacing: "0.01em" },
      caption: { fontSize: "0.75rem", color: isLight ? "#5a6a7a" : "#8a9bb0" },
    },

    shape: { borderRadius: 10 },

    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#ffffff" : "#1a2333",
            color: isLight ? "#1e2a3a" : "#e8edf2",
            boxShadow: "none",
            borderBottom: `1px solid ${isLight ? "#e4e8ed" : "#243040"}`,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isLight ? "#1e2a3a" : "#111820",
            color: "#ffffff",
            borderRight: "none",
            boxShadow: isLight
              ? "4px 0 20px rgba(30,42,58,0.1)"
              : "4px 0 20px rgba(0,0,0,0.4)",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#ffffff" : "#1a2333",
            border: `1px solid ${isLight ? "#e4e8ed" : "#243040"}`,
            boxShadow: isLight
              ? "0 1px 4px rgba(30,42,58,0.06), 0 4px 16px rgba(30,42,58,0.04)"
              : "0 2px 12px rgba(0,0,0,0.3)",
            borderRadius: 12,
            transition: "box-shadow 0.2s ease",
            "&:hover": {
              boxShadow: isLight
                ? "0 4px 12px rgba(30,42,58,0.1), 0 8px 24px rgba(30,42,58,0.06)"
                : "0 4px 20px rgba(0,0,0,0.45)",
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: isLight ? "#ffffff" : "rgba(17,24,32,0.6)",
              color: isLight ? "#1e2a3a" : "#e8edf2",
              borderRadius: 8,
              fontSize: "0.9375rem",
              "& fieldset": {
                borderColor: isLight ? "#cdd4dc" : "#243040",
              },
              "&:hover fieldset": {
                borderColor: isLight ? "#a0adb8" : "#3d4f60",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0ea5a0",
                borderWidth: "1.5px",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: isLight
                  ? "0 0 0 100px #ffffff inset"
                  : "0 0 0 100px rgba(17,24,32,0.98) inset",
                WebkitTextFillColor: isLight ? "#1e2a3a" : "#e8edf2",
                caretColor: isLight ? "#1e2a3a" : "#e8edf2",
              },
            },
            "& .MuiInputLabel-root": {
              color: isLight ? "#6e7f90" : "#6e7f90",
              fontSize: "0.9375rem",
              "&.Mui-focused": { color: "#0ea5a0" },
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
            fontSize: "0.9rem",
          },
          containedPrimary: {
            backgroundColor: "#0ea5a0",
            color: "#ffffff",
            boxShadow: "0 2px 8px rgba(14,165,160,0.3)",
            "&:hover": {
              backgroundColor: "#0b8580",
              boxShadow: "0 4px 14px rgba(14,165,160,0.4)",
            },
          },
          outlinedPrimary: {
            borderColor: isLight ? "#cdd4dc" : "#243040",
            color: isLight ? "#5a6a7a" : "#8a9bb0",
            "&:hover": {
              borderColor: "#0ea5a0",
              color: "#0ea5a0",
              backgroundColor: "rgba(14,165,160,0.05)",
            },
          },
          textPrimary: {
            color: isLight ? "#5a6a7a" : "#8a9bb0",
            "&:hover": {
              color: "#0ea5a0",
              backgroundColor: "rgba(14,165,160,0.05)",
            },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "color 0.15s, background-color 0.15s",
            "&:hover": {
              color: "#0ea5a0",
              backgroundColor: "rgba(14,165,160,0.08)",
            },
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${isLight ? "#e4e8ed" : "rgba(36,48,64,0.8)"}`,
            fontSize: "0.875rem",
          },
          head: {
            backgroundColor: isLight ? "#f7f8fa" : "#111820",
            color: isLight ? "#6e7f90" : "#6e7f90",
            fontWeight: 600,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: isLight
                ? "rgba(14,165,160,0.03)"
                : "rgba(14,165,160,0.06)",
            },
            "&:last-child td": { borderBottom: "none" },
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: "rgba(255,255,255,0.6)",
            borderRadius: 8,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#ffffff",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(14,165,160,0.18) !important",
              color: "#2cc8c3",
              borderLeft: "2px solid #0ea5a0",
              "&:hover": {
                backgroundColor: "rgba(14,165,160,0.25) !important",
              },
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: 11,
            borderRadius: 6,
            letterSpacing: "0.02em",
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            border: `1px solid ${isLight ? "#e4e8ed" : "#243040"}`,
            boxShadow: isLight
              ? "0 20px 60px rgba(30,42,58,0.12)"
              : "0 20px 60px rgba(0,0,0,0.5)",
            borderRadius: 14,
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: { borderColor: isLight ? "#e4e8ed" : "#243040" },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isLight ? "#1e2a3a" : "#111820",
            color: "#e8edf2",
            fontSize: 12,
            fontWeight: 500,
            border: `1px solid rgba(14,165,160,0.2)`,
            borderRadius: 6,
            padding: "6px 10px",
          },
        },
      },
    },
  });
};

export const theme = createAppTheme("light");

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    return (localStorage.getItem("themeMode") as PaletteMode) ?? "light";
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  const muiTheme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
