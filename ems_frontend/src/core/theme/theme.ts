import { createTheme, PaletteMode } from "@mui/material";

export const createAppTheme = (mode: PaletteMode) => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#285075",       // Navy blue
        light: "#3b82f6",
        dark: "#1e40af",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#E38E44",       // Orange
        light: "#fb923c",
        dark: "#c2410c",
        contrastText: "#ffffff",
      },
      background: {
        default: isLight ? "#f1f5f9" : "#0f172a",
        paper:   isLight ? "#ffffff" : "#1e293b",
      },
      text: {
        primary:   isLight ? "#0f172a" : "#f1f5f9",
        secondary: isLight ? "#475569" : "#cbd5e1",
      },
      divider: isLight ? "#e2e8f0" : "#334155",
      grey: {
        50:  "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
    },

    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 700 },
      h2: { fontSize: "2rem",   fontWeight: 700 },
      h3: { fontSize: "1.75rem",fontWeight: 700 },
      h4: { fontSize: "1.5rem", fontWeight: 700 },
      h5: { fontSize: "1.25rem",fontWeight: 600 },
      h6: { fontSize: "1.125rem",fontWeight: 600 },
    },

    shape: { borderRadius: 10 },

    components: {
      // ── AppBar ──────────────────────────────────────────────────────
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#285075",
            color: "#ffffff",
            boxShadow: isLight
              ? "0 1px 3px rgba(0,0,0,0.12)"
              : "0 1px 3px rgba(0,0,0,0.4)",
          },
        },
      },

      // ── Drawer ──────────────────────────────────────────────────────
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isLight ? "#285075" : "#0f172a",
            color: "#ffffff",
            borderRight: "none",
            boxShadow: isLight
              ? "2px 0 8px rgba(30,58,138,0.15)"
              : "2px 0 8px rgba(0,0,0,0.4)",
          },
        },
      },

      // ── Card ────────────────────────────────────────────────────────
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#ffffff" : "#1e293b",
            border: `1px solid ${isLight ? "#e2e8f0" : "#334155"}`,
            boxShadow: isLight
              ? "0 1px 4px rgba(0,0,0,0.06)"
              : "0 2px 8px rgba(0,0,0,0.3)",
          },
        },
      },

      // ── Paper ───────────────────────────────────────────────────────
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      // ── TextField ───────────────────────────────────────────────────
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: isLight ? "#ffffff" : "transparent",
              color: isLight ? "#0f172a" : "#f1f5f9",
              "& fieldset": {
                borderColor: isLight ? "#cbd5e1" : "#475569",
              },
              "&:hover fieldset": {
                borderColor: "#E38E44",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#E38E44",
              },
            },
            "& .MuiInputLabel-root": {
              color: isLight ? "#475569" : "#94a3b8",
              "&.Mui-focused": { color: "#E38E44" },
            },
            "& .MuiSelect-icon": {
              color: isLight ? "#475569" : "#94a3b8",
            },
          },
        },
      },

      // ── Button ──────────────────────────────────────────────────────
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
          },
          containedPrimary: {
            backgroundColor: "#E38E44",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(234,88,12,0.35)",
            "&:hover": {
              backgroundColor: "#c2410c",
              boxShadow: "0 6px 18px rgba(234,88,12,0.45)",
            },
          },
          outlinedPrimary: {
            borderColor: isLight ? "#cbd5e1" : "#334155",
            color: isLight ? "#475569" : "#94a3b8",
            "&:hover": {
              borderColor: "#E38E44",
              color: "#E38E44",
              backgroundColor: "rgba(234,88,12,0.06)",
            },
          },
        },
      },

      // ── IconButton ──────────────────────────────────────────────────
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.2s",
          },
        },
      },

      // ── Table ───────────────────────────────────────────────────────
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${isLight ? "#e2e8f0" : "rgba(51,65,85,0.6)"}`,
          },
          head: {
            backgroundColor: isLight ? "#f8fafc" : "#0f172a",
            color: isLight ? "#64748b" : "#64748b",
            fontWeight: 700,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: isLight
                ? "rgba(234,88,12,0.04)"
                : "rgba(234,88,12,0.06)",
            },
            "&:last-child td": { borderBottom: "none" },
          },
        },
      },

      // ── ListItemButton (Drawer nav) ──────────────────────────────────
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: "rgba(255,255,255,0.75)",
            borderRadius: 8,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#ffffff",
            },
            "&.Mui-selected": {
              backgroundColor: "#E38E44",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#c2410c" },
            },
          },
        },
      },

      // ── Chip ────────────────────────────────────────────────────────
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: 11 },
        },
      },

      // ── Dialog ──────────────────────────────────────────────────────
      MuiDialog: {
        styleOverrides: {
          paper: {
            border: `1px solid ${isLight ? "#e2e8f0" : "#334155"}`,
            boxShadow: isLight
              ? "0 20px 60px rgba(0,0,0,0.15)"
              : "0 20px 60px rgba(0,0,0,0.5)",
          },
        },
      },
    },
  });
};

// Default export (dark) kept for backward compat during migration
export const theme = createAppTheme("dark");
