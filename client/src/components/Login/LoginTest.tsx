import React, { useEffect, useRef } from 'react';
import { Box, Button, Container, TextField, Typography, Link } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import Navbar from '../Navbar/Navbar';
import * as THREE from 'three'; 
import NET from 'vanta/dist/vanta.net.min'; 

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fafff,
        backgroundColor: 0x1c1a4a,
        THREE: THREE, 
     
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy(); 
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#f0f4f8',
      }}
    >
      <Navbar />
      {/* Left side - Vanta.js animation */}
      <Box
        ref={vantaRef}
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Right side - Login form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#ffffff',
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: `${fadeIn} 0.5s ease-out`,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 4,
                color: '#1a237e',
                fontWeight: 700,
              }}
            >
              Welcome to OS
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#1a237e',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#1a237e',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#1a237e',
                  '&:hover': {
                    bgcolor: '#3f51b5',
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  mb: 2,
                  color: '#1a237e',
                  borderColor: '#1a237e',
                  '&:hover': {
                    bgcolor: '#e8eaf6',
                    borderColor: '#3f51b5',
                  },
                }}
              >
                Sign in with Google
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Link href="#" variant="body2" sx={{ color: '#1a237e' }}>
                  Forgot password?
                </Link>
                <Link href="#" variant="body2" sx={{ color: '#1a237e' }}>
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}