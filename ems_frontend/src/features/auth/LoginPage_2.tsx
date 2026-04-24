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

// const GOLD   = "#c9a84c";
// const FOREST = "#1a3a2a";
// const DEEP   = "#0d1f17";

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

//   // Shared styles for both text fields — fixes white-bg + white-text issue
//   const fieldSx = {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: "rgba(13,31,23,0.6)",   // dark forest, no white bg
//       color: "#f0ece0",                          // warm parchment text
//       fontFamily: '"DM Sans", sans-serif',
//       borderRadius: "4px",
//       "& fieldset": { borderColor: "rgba(201,168,76,0.25)" },
//       "&:hover fieldset": { borderColor: "rgba(201,168,76,0.55)" },
//       "&.Mui-focused fieldset": { borderColor: GOLD, borderWidth: "1.5px" },
//       // Fix browser autofill turning the input white
//       "& input:-webkit-autofill": {
//         WebkitBoxShadow: "0 0 0 100px rgba(13,31,23,0.95) inset",
//         WebkitTextFillColor: "#f0ece0",
//         caretColor: "#f0ece0",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: "rgba(240,236,224,0.5)",
//       fontFamily: '"DM Sans", sans-serif',
//       "&.Mui-focused": { color: GOLD },
//     },
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       sx={{
//         // Deep forest radial gradient background
//         background: `radial-gradient(ellipse at 60% 40%, #2d6a4f 0%, ${FOREST} 40%, ${DEEP} 100%)`,
//         // Subtle noise-like texture via repeating pattern
//         "&::before": {
//           content: '""',
//           position: "fixed",
//           inset: 0,
//           backgroundImage:
//             "radial-gradient(circle at 20% 80%, rgba(201,168,76,0.07) 0%, transparent 50%), " +
//             "radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 50%)",
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Card
//         sx={{
//           width: 420,
//           backgroundColor: "rgba(22,42,31,0.92)",
//           backdropFilter: "blur(16px)",
//           border: `1px solid rgba(201,168,76,0.2)`,
//           boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
//           borderRadius: "6px",
//           overflow: "visible",
//           position: "relative",
//         }}
//       >
//         {/* Gold top accent line */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: "10%",
//             width: "80%",
//             height: "1.5px",
//             background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
//             borderRadius: "50%",
//           }}
//         />

//         <CardContent sx={{ p: 4 }}>
//           {/* Logo mark */}
//           <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
//             <Box
//               sx={{
//                 width: 48,
//                 height: 48,
//                 borderRadius: "6px",
//                 background: `linear-gradient(135deg, ${GOLD}, #e8c97a)`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 800,
//                 fontSize: 22,
//                 color: DEEP,
//                 mb: 2,
//                 boxShadow: `0 4px 16px rgba(201,168,76,0.35)`,
//               }}
//             >
//               E
//             </Box>
//             <Typography
//               variant="h5"
//               sx={{
//                 color: "#f0ece0",
//                 fontFamily: '"Cormorant Garamond", Georgia, serif',
//                 fontWeight: 600,
//                 letterSpacing: "0.02em",
//                 lineHeight: 1,
//               }}
//             >
//               EMS Portal
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: "rgba(201,168,76,0.7)",
//                 fontFamily: '"DM Sans", sans-serif',
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 fontSize: 10,
//                 mt: 0.75,
//               }}
//             >
//               Employee Management System
//             </Typography>
//           </Box>

//           {/* Username field */}
//           <TextField
//             label="Username"
//             name="username"
//             fullWidth
//             margin="normal"
//             value={form.username}
//             onChange={handleChange}
//             sx={fieldSx}
//           />

//           {/* Password field */}
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
//                       color: "rgba(240,236,224,0.4)",
//                       "&:hover": { color: GOLD, backgroundColor: "rgba(201,168,76,0.08)" },
//                     }}
//                   >
//                     {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Error message */}
//           {error && (
//             <Typography
//               variant="body2"
//               mt={1.5}
//               sx={{
//                 color: "#f87171",
//                 fontFamily: '"DM Sans", sans-serif',
//                 fontSize: 13,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.5,
//               }}
//             >
//               ✕ Invalid username or password
//             </Typography>
//           )}

//           {/* Submit button */}
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSubmit}
//             disabled={isPending}
//             sx={{
//               mt: 3,
//               py: 1.25,
//               borderRadius: "4px",
//               backgroundColor: GOLD,
//               color: DEEP,
//               fontFamily: '"DM Sans", sans-serif',
//               fontWeight: 600,
//               fontSize: 14,
//               letterSpacing: "0.06em",
//               textTransform: "none",
//               boxShadow: `0 4px 16px rgba(201,168,76,0.3)`,
//               "&:hover": {
//                 backgroundColor: "#b8962e",
//                 boxShadow: `0 6px 20px rgba(201,168,76,0.4)`,
//               },
//               "&:disabled": {
//                 backgroundColor: "rgba(201,168,76,0.3)",
//                 color: "rgba(13,31,23,0.5)",
//               },
//             }}
//           >
//             {isPending
//               ? <CircularProgress size={20} sx={{ color: DEEP }} />
//               : "Sign In"}
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };