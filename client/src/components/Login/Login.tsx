import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useAtom } from 'jotai';
import { activeUserAtom, backendUrl } from '../../state/Atoms';
import Navbar from '../Navbar/Navbar';
import NavMobile from '../Navbar/NavMobile';
import { Link, useNavigate } from 'react-router-dom';
import BarAnimation from '../Animations/BarAnimation';
import GoogleSignIn from './Google.tsx';
import GihtubSignInButton from './Github.signin.tsx';

export default function Login() {
  const [, setActiveUser] = useAtom(activeUserAtom);
  // const [loadingAtom,setloadingAtom] = useAtom(loadingAtom);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setloadingAtom(true)
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        formData
      );
      console.log(response.data);
      setActiveUser(response.data.email);
      localStorage.setItem('token', response.data.token);
    } catch (err: unknown) {
      const error = err as Error;
      console.log(error.message);
    } finally {
      // setloadingAtom(false)
    }
    // const content = formData;
    // console.log(content);
  }

  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <section className={styles.loginPage}>
        <div className={styles.login}>
          <h2>Welcome back</h2>
          <GoogleSignIn />
          <GihtubSignInButton />
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
            <button type="submit" className={`btn-primary`}>
              Sign in
            </button>
          </form>
          <div className={styles.createAccountQuery}>
            <p className="white-secondary">Don't have an account?</p>
            <p>
              <Link to="/signup">Sign up now</Link>
            </p>
          </div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className={styles.loginBackground}>
        <BarAnimation />
        </div>
      </section>
    </div>
  );
}