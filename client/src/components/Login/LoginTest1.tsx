import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { useAtom } from 'jotai';
import { activeUserAtom, backendUrl } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';
import NavMobile from '../Navbar/NavMobile';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import { BarChart, PieChart, Timeline, TrendingUp } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#4caf50',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontSize: 16,
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
  },
});

const ChartIcon = ({ icon: Icon, color }: { icon: React.ElementType; color: string }) => (
  <Box
    sx={{
      width: { xs: 40, md: 60 },
      height: { xs: 40, md: 60 },
      borderRadius: '50%',
      backgroundColor: color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }}
  >
    <Icon sx={{ color: 'white', fontSize: { xs: 24, md: 36 } }} />
  </Box>
);

export default function LoginPage() {
  const [, setActiveUser] = useAtom(activeUserAtom);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (token && email) {
      localStorage.setItem('token', token);
      setActiveUser(email);
      navigate('/dashboard');
    }
  }, [navigate, setActiveUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, formData);
      setActiveUser(response.data.email);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${backendUrl}/api/google`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <NavMobile />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          bgcolor: 'background.default',
        }}
      >
        {/* Left Section with icons */}
        <Box
          sx={{
            flex: { xs: 'none', md: 1 },
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 20,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            DataViz Analytics
          </Typography>
          <Typography variant="h6" gutterBottom>
            Unlock the power of your data
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 4,
              mt: 6,
            }}
          >
            <ChartIcon icon={BarChart} color="#1565c0" />
            <ChartIcon icon={PieChart} color="#c62828" />
            <ChartIcon icon={Timeline} color="#f9a825" />
            <ChartIcon icon={TrendingUp} color="#2e7d32" />
          </Box>
          {!isMobile && (
            <Box
              sx={{
                position: 'absolute',
                top: -100,
                left: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',vectorEffect
                
              }}
            />
          )}
          {!isMobile && (
            <Box
              sx={{
                position: 'absolute',
                bottom: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
          )}
        </Box>

        {/* Right Section (Login Form) */}
        <Box
          sx={{
            flex: { xs: 'none', md: 1 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 12,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="primary.main">
              Sign in to your account
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
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: 'primary.main' }}
              >
                Sign In
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
              sx={{
                py: 1.5,
                color: 'text.primary',
                borderColor: 'text.secondary',
                '&:hover': {
                  borderColor: 'text.primary',
                },
              }}
            >
              Sign in with Google
            </Button>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
              Don't have an account?{' '}
              <Typography component={Link} to="/signup" color="text.secondary" fontWeight="bold">
                Sign up
              </Typography>
            </Typography>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
