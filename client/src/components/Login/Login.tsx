import React, { useState, useEffect, useRef } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useAtom } from "jotai";
import { activeUserAtom, backendUrl } from "../../state/Atoms";
import Navbar from "../Navbar/Navbar";
import NavMobile from "../Navbar/NavMobile";
import { Link, useNavigate } from "react-router-dom";
import BarAnimation from "../Animations/BarAnimation";
import demoImg from "../../assets/backgrounds/dashboard.png";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [, setActiveUser] = useAtom(activeUserAtom);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    if (token && email) {
      localStorage.setItem("token", token);
      setActiveUser(email);
      navigate("/dashboard");
    }

    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
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
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        formData
      );
      setActiveUser(response.data.email);
      localStorage.setItem("token", response.data.token);
      setErrorMessage("");
    } catch (err: unknown) {
      setErrorMessage("Failed to log in. Please check your email or password.");
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
          <h2>Welcome back</h2>
          {errorMessage && (
            <Alert severity="error" style={{ marginBottom: "1rem" }}>
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
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            />
            <motion.button
              type="submit"
              className="button btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Sign in
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
            <p className="black">Don't have an account?</p>
            <p>
              <Link to="/signup" style={{ color: "black" }}>
                Sign up now
              </Link>
            </p>
          </div>
          <Link to="/forgot-password" style={{ color: "black" }}>
            Forgot Password?
          </Link>
        </motion.div>

        <div className={styles.loginBackground} ref={vantaRef}>
          <div className={styles.typewriter}>
            <h1>Welcome to OS Analytics</h1>
          </div>
          <div className={styles.imageWrapper}>
            <motion.img
              src={demoImg}
              alt="Dashboard Preview"
              className={styles.demoImg}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
