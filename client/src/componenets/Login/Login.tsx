import React from 'react'
import styles from './Login.module.css'

export default function Login() {
  return (
    <div className={styles.login}>
        <div className={styles.oathButtons}>
            <button className={`${styles.loginBtn} ${styles.google}`}>Continue with Google</button>
            <button className={`${styles.loginBtn} ${styles.github}`}>Continue with GitHub</button>
        </div>
        <div className={styles.loginCredentials}>
            <input placeholder="email"></input>
            <input placeholder="password"></input>
            <button className={`btn-primary`}>Sign in</button>
        </div>
        <p>Don't have an account? <span>Sign up now</span></p>
    </div>
  )
}
