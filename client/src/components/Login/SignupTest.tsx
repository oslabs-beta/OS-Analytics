import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { activeUserAtom, backendUrl } from "../../state/Atoms";
import Navbar from "../Navbar/Navbar";
import NavMobile from "../Navbar/NavMobile";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

// Custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#4caf50",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Signup() {
  const [, setActiveUser] = useAtom(activeUserAtom);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, formData);
      setActiveUser(response.data.email);
      localStorage.setItem("token", response.data.token);
    } catch (err: unknown) {
      const error = err as Error;
      console.log(error.message);
    }
  }

  const handleGoogleSignIn = () => {
    window.location.href = `${backendUrl}/api/google`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <NavMobile />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            flex: 1,
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            DataViz Analytics
          </Typography>
          <Typography variant="h6">Unlock the power of your data</Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            bgcolor: "background.default",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
              Create an account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: "primary.main" }}
              >
                Create account
              </Button>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 2, mb: 2 }}>
              Or
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{ py: 1.5 }}
            >
              Sign up with Google
            </Button>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
              Already have an account?{" "}
              <Typography component="a" href="/login" color="primary.main" fontWeight="bold">
                Sign in
              </Typography>
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
