import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  Box,
} from '@mui/material';

import {useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
const navigate = useNavigate();
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/auth/forgot-password`, { email });
      alert('Password reset code sent to your email.');
      setIsCodeSent(true);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      alert('Error in sending password reset code.');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/auth/confirm-password`, {
        email,
        code,
        newPassword,
      });
      alert('Password reset successful. You can now log in with your new password.');
      setIsCodeSent(false);
      setEmail('');
      setCode('');
      setNewPassword('');
      navigate('/login')

    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      alert('Error in resetting password.');
    }
  };

  return (
    <Box sx={{ paddingTop: '50px' }}>
          <Navbar />
      <Card sx={{ maxWidth: 400, margin: "0 auto", mt: 20 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {isCodeSent 
              ? "Enter the code you received and your new password" 
              : "Enter your email to receive a reset code"}
          </Typography>
          {!isCodeSent ? (
            <Box component="form" onSubmit={handleEmailSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Send Reset Code
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleResetSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Reset Code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                margin="normal"
              />
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}  