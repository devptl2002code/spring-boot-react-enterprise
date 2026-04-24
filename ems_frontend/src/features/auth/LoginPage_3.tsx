// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useLogin } from "./useLogin";
// import { useAuth } from "./useAuth";
// import { useNavigate } from "react-router-dom";

// const VIOLET    = "#7c6ff7";
// const CORAL     = "#e8445a";
// const DEEP_NAVY = "#0d1024";
// const NAVY      = "#1b1f3b";

// export const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const { mutate, isPending, error } = useLogin();

//   const [form, setForm] = useState({ username: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = () => {
//     mutate(form, {
//       onSuccess: (data) => {
//         login(data);
//         navigate("/");
//       },
//     });
//   };

//   const fieldSx = {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: "rgba(13,16,36,0.55)",
//       color: "#e8e6ff",
//       fontFamily: '"Outfit", sans-serif',
//       borderRadius: "10px",
//       "& fieldset": { borderColor: "rgba(124,111,247,0.2)" },
//       "&:hover fieldset": { borderColor: "rgba(124,111,247,0.5)" },
//       "&.Mui-focused fieldset": { borderColor: VIOLET, borderWidth: "1.5px" },
//       "& input:-webkit-autofill": {
//         WebkitBoxShadow: "0 0 0 100px rgba(13,16,36,0.98) inset",
//         WebkitTextFillColor: "#e8e6ff",
//         caretColor: "#e8e6ff",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: "rgba(232,230,255,0.4)",
//       fontFamily: '"Outfit", sans-serif',
//       "&.Mui-focused": { color: VIOLET },
//     },
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       sx={{
//         background: `radial-gradient(ellipse at 30% 60%, #2d2b6e 0%, ${NAVY} 40%, ${DEEP_NAVY} 100%)`,
//         "&::before": {
//           content: '""',
//           position: "fixed",
//           inset: 0,
//           backgroundImage:
//             // Violet glow top-right
//             `radial-gradient(circle at 75% 15%, rgba(124,111,247,0.15) 0%, transparent 45%),` +
//             // Coral glow bottom-left
//             `radial-gradient(circle at 20% 85%, rgba(232,68,90,0.12) 0%, transparent 40%)`,
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Card
//         sx={{
//           width: 420,
//           backgroundColor: "rgba(22,26,53,0.88)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(124,111,247,0.2)",
//           boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,111,247,0.05)",
//           borderRadius: "16px",
//           overflow: "visible",
//           position: "relative",
//         }}
//       >
//         {/* Violet → coral shimmer line on top */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: "8%",
//             width: "84%",
//             height: "1.5px",
//             background: `linear-gradient(90deg, transparent, ${VIOLET}, ${CORAL}, transparent)`,
//             borderRadius: "50%",
//           }}
//         />

//         <CardContent sx={{ p: 4 }}>
//           {/* Logo + title */}
//           <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
//             <Box
//               sx={{
//                 width: 52,
//                 height: 52,
//                 borderRadius: "14px",
//                 background: `linear-gradient(135deg, ${VIOLET} 0%, ${CORAL} 100%)`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 800,
//                 fontSize: 24,
//                 color: "#fff",
//                 mb: 2.5,
//                 boxShadow: `0 8px 24px rgba(124,111,247,0.45)`,
//                 fontFamily: '"Outfit", sans-serif',
//               }}
//             >
//               E
//             </Box>
//             <Typography
//               variant="h5"
//               sx={{
//                 color: "#e8e6ff",
//                 fontFamily: '"Outfit", sans-serif',
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//                 lineHeight: 1,
//               }}
//             >
//               EMS Portal
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: "rgba(124,111,247,0.7)",
//                 fontFamily: '"Outfit", sans-serif',
//                 letterSpacing: "0.14em",
//                 textTransform: "uppercase",
//                 fontSize: 10,
//                 mt: 0.75,
//               }}
//             >
//               Employee Management System
//             </Typography>
//           </Box>

//           {/* Username */}
//           <TextField
//             label="Username"
//             name="username"
//             fullWidth
//             margin="normal"
//             value={form.username}
//             onChange={handleChange}
//             sx={fieldSx}
//           />

//           {/* Password */}
//           <TextField
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             margin="normal"
//             value={form.password}
//             onChange={handleChange}
//             sx={fieldSx}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword((p) => !p)}
//                     edge="end"
//                     aria-label="toggle password visibility"
//                     sx={{
//                       color: "rgba(232,230,255,0.35)",
//                       "&:hover": { color: VIOLET, backgroundColor: "rgba(124,111,247,0.1)" },
//                     }}
//                   >
//                     {showPassword
//                       ? <VisibilityOff sx={{ fontSize: 18 }} />
//                       : <Visibility sx={{ fontSize: 18 }} />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Error */}
//           {error && (
//             <Typography
//               variant="body2"
//               mt={1.5}
//               sx={{
//                 color: "#ff8a98",
//                 fontFamily: '"Outfit", sans-serif',
//                 fontSize: 13,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.5,
//               }}
//             >
//               ✕ Invalid username or password
//             </Typography>
//           )}

//           {/* Submit */}
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSubmit}
//             disabled={isPending}
//             sx={{
//               mt: 3,
//               py: 1.3,
//               borderRadius: "10px",
//               background: `linear-gradient(135deg, ${VIOLET} 0%, ${CORAL} 100%)`,
//               color: "#fff",
//               fontFamily: '"Outfit", sans-serif',
//               fontWeight: 600,
//               fontSize: 14,
//               letterSpacing: "0.03em",
//               textTransform: "none",
//               boxShadow: `0 4px 20px rgba(124,111,247,0.4)`,
//               "&:hover": {
//                 background: `linear-gradient(135deg, #6a5de0 0%, #c02040 100%)`,
//                 boxShadow: `0 6px 26px rgba(124,111,247,0.5)`,
//               },
//               "&:disabled": {
//                 background: "rgba(124,111,247,0.25)",
//                 color: "rgba(232,230,255,0.35)",
//               },
//             }}
//           >
//             {isPending
//               ? <CircularProgress size={20} sx={{ color: "#fff" }} />
//               : "Sign In"}
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };