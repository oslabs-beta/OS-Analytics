import React, { useState, useEffect, useRef } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useAtom } from 'jotai';
import { activeUserAtom, backendUrl } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';
import NavMobile from '../Navbar/NavMobile';
import { Link, useNavigate } from 'react-router-dom';
import BarAnimation from '../Animations/BarAnimation';
import * as THREE from 'three'; 
import NET from 'vanta/dist/vanta.net.min'; 

export default function Login() {
  const [, setActiveUser] = useAtom(activeUserAtom);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const vantaRef = useRef(null);  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (token && email) {
      localStorage.setItem('token', token);
      setActiveUser(email);
      navigate('/dashboard');
    }


    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, formData);
      setActiveUser(response.data.email);
      localStorage.setItem('token', response.data.token);
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
          <h2>Welcome back</h2>
          <div className={styles.oathButtons}>
            <button
              className={`${styles.loginBtn} ${styles.google} button`}
              onClick={() => (window.location.href = `${backendUrl}/api/google`)}
            >
              Continue with Google
            </button>
            <button className={`  ${styles.loginBtn} ${styles.github} button`}>
              Continue with GitHub
            </button>
          </div>
          <BarAnimation />
          <form onSubmit={handleSubmit} className={styles.loginCredentials}>
            <input
              className='input'
              type="email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className='input'
              type="password"
              minLength={6}
              placeholder="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
            <button type="submit" className="button btn-primary">Sign in</button>
          </form>
          <div className={styles.createAccountQuery}>
            <p className="black">Don't have an account?</p>
            <p>
            <Link to="/signup" style={{ color: "black" }}>Sign up now</Link>

            </p>
          </div>
          <Link to="/forgot-password" style={{ color: "black" }} >Forgot Password?</Link>
        </div>
        <div className={styles.loginBackground} ref={vantaRef}>
        </div>
      </section>
    </div>
  );
}

