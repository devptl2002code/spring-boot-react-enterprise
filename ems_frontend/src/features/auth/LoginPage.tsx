import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "./useLogin";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const SLATE = "#1e2a3a";
const TEAL  = "#0ea5a0";

export const LoginPage = () => {
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const { mutate, isPending, error } = useLogin();

  const [form, setForm]             = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    mutate(form, {
      onSuccess: (data) => { login(data); navigate("/"); },
    });
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f7f8fa",
      color: SLATE,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      borderRadius: "8px",
      fontSize: "0.9375rem",
      "& fieldset": { borderColor: "#cdd4dc" },
      "&:hover fieldset": { borderColor: "#a0adb8" },
      "&.Mui-focused fieldset": { borderColor: TEAL, borderWidth: "1.5px" },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px #f7f8fa inset",
        WebkitTextFillColor: SLATE,
        caretColor: SLATE,
      },
    },
    "& .MuiInputLabel-root": {
      color: "#6e7f90",
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontSize: "0.9375rem",
      "&.Mui-focused": { color: TEAL },
    },
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        // Clean light background — soft off-white with a very subtle teal tint
        backgroundColor: "#f0f4f8",
        backgroundImage:
          "radial-gradient(circle at 70% 20%, rgba(14,165,160,0.07) 0%, transparent 50%), " +
          "radial-gradient(circle at 20% 80%, rgba(30,42,58,0.05) 0%, transparent 50%)",
      }}
    >
      {/* Left branding strip — visible on wider screens */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: 360,
          px: 6,
          mr: 6,
        }}
      >
        {/* Logo mark */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            backgroundColor: TEAL,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 22,
            color: "#fff",
            mb: 3,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            boxShadow: "0 4px 16px rgba(14,165,160,0.3)",
          }}
        >
          E
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: SLATE,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          Employee Management System
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#5a6a7a",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            lineHeight: 1.7,
            fontSize: "0.9375rem",
          }}
        >
          Manage your workforce efficiently. Track attendance, performance, and more — all in one place.
        </Typography>

        {/* Feature dots */}
        {["Role-based access control", "Real-time dashboards", "Secure & reliable"].map((f) => (
          <Box key={f} display="flex" alignItems="center" gap={1.5} mt={2}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: TEAL,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: "#5a6a7a", fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              {f}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Login card ───────────────────────────────────────── */}
      <Card
        sx={{
          width: { xs: "92%", sm: 420 },
          backgroundColor: "#ffffff",
          border: "1px solid #e4e8ed",
          boxShadow:
            "0 4px 6px rgba(30,42,58,0.04), 0 12px 32px rgba(30,42,58,0.08)",
          borderRadius: "16px",
          overflow: "visible",
          position: "relative",
        }}
      >
        {/* Teal top accent line */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "12%",
            width: "76%",
            height: "2px",
            backgroundColor: TEAL,
            borderRadius: "0 0 4px 4px",
            opacity: 0.9,
          }}
        />

        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Mobile header only */}
          <Box
            display="flex"
            alignItems="center"
            gap={1.5}
            mb={3}
            sx={{ display: { md: "none" } }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "9px",
                backgroundColor: TEAL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
              }}
            >
              E
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: SLATE,
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              EMS Portal
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: SLATE,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              letterSpacing: "-0.015em",
              mb: 0.5,
            }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6e7f90",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              mb: 3,
            }}
          >
            Sign in to your account to continue
          </Typography>

          {/* Username */}
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            sx={fieldSx}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            sx={fieldSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                    aria-label="toggle password visibility"
                    sx={{
                      color: "#a0adb8",
                      "&:hover": { color: TEAL, backgroundColor: "rgba(14,165,160,0.07)" },
                    }}
                  >
                    {showPassword
                      ? <VisibilityOff sx={{ fontSize: 18 }} />
                      : <Visibility sx={{ fontSize: 18 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error */}
          {error && (
            <Box
              sx={{
                mt: 1.5,
                px: 1.5,
                py: 1,
                borderRadius: "7px",
                backgroundColor: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.18)",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#dc2626",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Invalid username or password. Please try again.
              </Typography>
            </Box>
          )}

          {/* Submit */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={isPending}
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: "8px",
              backgroundColor: TEAL,
              color: "#ffffff",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              fontSize: "0.9375rem",
              textTransform: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 2px 8px rgba(14,165,160,0.3)",
              "&:hover": {
                backgroundColor: "#0b8580",
                boxShadow: "0 4px 16px rgba(14,165,160,0.4)",
              },
              "&:disabled": {
                backgroundColor: "rgba(14,165,160,0.35)",
                color: "rgba(255,255,255,0.6)",
              },
            }}
          >
            {isPending
              ? <CircularProgress size={20} sx={{ color: "#fff" }} />
              : "Sign In"}
          </Button>

          {/* Footer note */}
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            mt={2.5}
            sx={{ color: "#a0adb8", fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Protected by enterprise-grade security
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};