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

export default function Signup() {
  const [, setActiveUser] = useAtom(activeUserAtom);
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
    } catch (err: unknown) {
      const error = err as Error;
      console.log(error.message);
    }
  }

  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <section className={styles.loginPage}>
        <div className={styles.login}>
          <h2>Create Account</h2>
          <div className={styles.oathButtons}>
            <button
              className={`button ${styles.loginBtn} ${styles.google}`}
              onClick={() =>
                (window.location.href = `${backendUrl}/api/google`)
              }
            >
              Continue with Google
            </button>
            <button className={`button ${styles.loginBtn} ${styles.github}`}>
              Continue with GitHub
            </button>
          </div>
          <BarAnimation />
          <form onSubmit={handleSubmit} className={styles.loginCredentials}>
            <input
              className="input"
              type="email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="password"
              minLength={6}
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="password"
              minLength={6}
              placeholder="confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button btn-primary">
              Create account
            </button>
          </form>
          <div className={styles.createAccountQuery}>
            <p className="black">Already have an account?</p>
            <p>
              <Link to="/login" style={{ color: "black" }}>Sign in here</Link>
            </p>
          </div>
        </div>
        <div className={styles.loginBackground} ref={vantaRef}></div>
      </section>
    </div>
  );
}
