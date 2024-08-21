import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/map-logo.png';
import logout from '../../assets/logout.png';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { activeUserAtom, authAtom } from '../../state/Atoms';

export default function Navbar() {
  const [user, setUser] = useAtom(activeUserAtom)
  const [auth, setAuth] = useAtom(authAtom)
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <div className={styles.logoBox}>
            <img className={styles.navLogo} src={logo} alt="at-logo" />
            <h3>Tracker</h3>
          </div>

          <div className={styles.navLinks}>
            <span>Product</span>
            <span>Docs</span>
            <span>Product</span>
            <span>Team</span>
          </div>
        </div>
        <div className={styles.navRight}>
          <span>GitHub</span>
          {user.length>0 && auth === true ? (
            <>
              <Link to="/user/eric">
                <button className={`btn-primary ${styles.navButton}`}>
                  Dashboard
                </button>
              </Link>
              <Link to="/" onClick={()=>{setAuth(false); setUser('')}}>
            
                <img
                  className={styles.logOutIcon}
                  src={logout}
                  alt="sign out"
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={`btn-secondary ${styles.navButton}`}>
                  Sign in
                </button>
              </Link>
              <button className={`btn-primary ${styles.navButton}`}>
                Get started
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
