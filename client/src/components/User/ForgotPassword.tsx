import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
        <Navbar />
      <h2>Forgot Password</h2>
      {step === 1 ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              margin: '10px 0',
              padding: '10px',
              width: '80%',
              maxWidth: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            onClick={handleForgotPassword}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Send Reset Code
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter the code you received"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{
              margin: '10px 0',
              padding: '10px',
              width: '80%',
              maxWidth: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              margin: '10px 0',
              padding: '10px',
              width: '80%',
              maxWidth: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            onClick={handleConfirmPassword}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
