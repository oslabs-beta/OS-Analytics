import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/map-logo.png';

export default function Navbar() {
  const [activeUser, setActiveUser] = useState(false);
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
            {activeUser ? <button className="btn-primary">Dashboard</button> :
            <>
              <button className={`btn-secondary ${styles.navButton}`}>Sign in</button>
              <button className={`btn-primary ${styles.navButton}`}>Get started</button>
            </>
          }
            
            
        </div>
      </div>
    </div>
  );
}
