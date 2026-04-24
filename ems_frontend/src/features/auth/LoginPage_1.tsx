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

// export const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const { mutate, isPending, error } = useLogin();

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     mutate(form, {
//       onSuccess: (data) => {
//         login(data);
//         navigate("/");
//       },
//     });
//   };

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       sx={{
//         background:
//           "radial-gradient(circle at center, #285075 0%, #1a3a52 100%)",
//       }}
//     >
//       <Card sx={{ width: 400, padding: 2, boxShadow: 3 }}>
//         <CardContent>
//           <Typography variant="h5" mb={2} textAlign="center">
//             EMS Login
//           </Typography>

//           <TextField
//             label="Username"
//             name="username"
//             fullWidth
//             margin="normal"
//             value={form.username}
//             onChange={handleChange}
//           />

//           <TextField
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             margin="normal"
//             value={form.password}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleTogglePassword}
//                     edge="end"
//                     aria-label="toggle password visibility"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {error && (
//             <Typography color="error" variant="body2" mt={1}>
//               Invalid username or password
//             </Typography>
//           )}

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleSubmit}
//             disabled={isPending}
//           >
//             {isPending ? <CircularProgress size={24} /> : "Login"}
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };
