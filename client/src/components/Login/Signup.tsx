import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useAtom } from 'jotai';
import { activeUserAtom } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';
import NavMobile from '../Navbar/NavMobile';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [, setActiveUser] = useAtom(activeUserAtom);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log(response.data);
      setActiveUser(response.data.email);
      localStorage.setItem('token', response.data.token)
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <div className={styles.login}>
        <h2>Welcome to Activity Tracker</h2>
        <div className={styles.oathButtons}>
          <button className={`${styles.loginBtn} ${styles.google}`}
        onClick = {(() => window.location.href = 'http://localhost:8080/api/google')}
          >
            Continue with Google
          </button>
          <button className={`${styles.loginBtn} ${styles.github}`}>
            Continue with GitHub
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={styles.loginCredentials}
        >
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></input>
          <input
            type="password"
            minLength={6}
            placeholder="password"
            value={formData.password}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></input>
           <input
            type="password"
            minLength={6}
            placeholder="confirm password"
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></input>
          <button type="submit" className={`btn-primary`}>
            Create account
          </button>
        </form>
        <div className={styles.createAccountQuery}>
        </div>
      </div>
    </div>
  );
}
