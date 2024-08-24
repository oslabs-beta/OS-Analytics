import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useAtom } from 'jotai';
import { activeUserAtom} from '../../state/Atoms';


export default function Login() {
  const [, setActiveUser] = useAtom(activeUserAtom)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

 async function handleSubmit (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //POST Request for Login Here...
    try{
    const response = await axios.post ('/api/auth/login', formData)
    console.log(response.data)
    setActiveUser(response.data.email)
    }

    catch (err: any){
      console.log(err.message)
    }
    // const content = formData;
    // console.log(content);
  }

  return (
    <div className={styles.login}>
      <div className={styles.oathButtons}>
        <button className={`${styles.loginBtn} ${styles.google}`}>
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
          minLength={3}
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
      <p>
        Don't have an account? <span>Sign up now</span>
      </p>
    </div>
  );
}
