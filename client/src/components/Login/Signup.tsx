import React, { useState, useEffect, useRef } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useAtom } from "jotai";
import { activeUserAtom, backendUrl } from "../../state/Atoms";
import Navbar from "../Navbar/Navbar";
import NavMobile from "../Navbar/NavMobile";
import BarAnimation from "../Animations/BarAnimation";
import * as THREE from 'three'; 
import GLOBE from 'vanta/dist/vanta.globe.min'; 
import { Link, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";

export default function Signup() {
  const [, setActiveUser] = useAtom(activeUserAtom);
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = GLOBE({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 100.00,
      minWidth: 100.00,
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, formData);
      setActiveUser(response.data.email);
      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.response.data)
    }
  }

  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <motion.section
        className={styles.loginPage}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
      >
        <motion.div
          className={styles.login}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Create Account</h2>
          {errorMessage && (
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {errorMessage}
            </Alert>
          )}
          <BarAnimation />
          <form onSubmit={handleSubmit} className={styles.loginCredentials}>
            <motion.input
              className="input"
              type="email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
            <motion.input
              className="input"
              type="password"
              minLength={6}
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            />
            <motion.input
              className="input"
              type="password"
              minLength={6}
              placeholder="confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />
            <motion.button
              type="submit"
              className="button btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              Create account
            </motion.button>
          </form>

          <motion.div
            className={styles.oathButtons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Button
              onClick={() => (window.location.href = "/api/google")}
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              fullWidth
            >
              Continue with Google
            </Button>
          </motion.div>


          <div className={styles.createAccountQuery}>
            <p className="black">Already have an account?</p>
            <p>
              <Link to="/login" style={{ color: "black" }}>Sign in here</Link>
            </p>
          </div>
        </motion.div>

        <div className={styles.loginBackground} ref={vantaRef}></div>
      </motion.section>
    </div>
  );
}
