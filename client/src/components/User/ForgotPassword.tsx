import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  async function handleForgotPassword() {
    try {
      await axios.post(`${backendUrl}/api/auth/forgot-password`, { email });
      alert('Password reset code sent to your email.');
      setStep(2);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      alert('Error in sending password reset code.');
    }
  }

  async function handleConfirmPassword() {
    try {
      await axios.post(`${backendUrl}/api/auth/confirm-password`, {
        email,
        code,
        newPassword,
      });
      alert('Password reset successful. You can now log in with your new password.');
      setStep(1);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      alert('Error in resetting password.');
    }
  }

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      {step === 1 ? (
        <Box>
          <TextField
            type="email"
            label="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '16px', maxWidth: '300px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleForgotPassword}
            sx={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Send Reset Code
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            type="text"
            label="Enter the code you received"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '16px', maxWidth: '300px' }}
          />
          <TextField
            type="password"
            label="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '16px', maxWidth: '300px' }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmPassword}
            sx={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Reset Password
          </Button>
        </Box>
      )}
    </Box>
  );
}
