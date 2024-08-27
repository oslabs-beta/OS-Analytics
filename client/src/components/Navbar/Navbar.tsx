import styles from './Navbar.module.css';
import logo from '../../assets/map-logo.png';
import logout from '../../assets/logout.png';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { activeUserAtom, activeNavAtom } from '../../state/Atoms';
import { handleLogout } from '../../services/authConfig';
export default function Navbar() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const [activeNav, setActiveNav] = useAtom(activeNavAtom);

  const onLogoutClick = async () => {
    const success = await handleLogout();
    if (success) {
      setActiveUser('');
    }
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <Link
            to="/"
            onClick={() => {
              setActiveNav(false);
            }}
          >
            <div className={styles.logoBox}>
              <img className={styles.navLogo} src={logo} alt="at-logo" />
              <h3>Tracker</h3>
            </div>
          </Link>
          {activeUser ? (
            <div className={styles.navLinks}>
              <span> DashBoard </span>
              <span> Websites</span>
              <span>Link3</span>
            </div>
          ) : (
            <div className={styles.navLinks}>
              <span>Product</span>
              <span>Documentation</span>
              <span>Getting Started</span>
              <span>Team</span>
            </div>
          )}
        </div>
        <div className={styles.navRight}>
          <span>GitHub</span>
          {activeUser ? (
            <>
              <Link to="/dashboard">
                <button className={`btn-primary ${styles.navButton}`}>
                  Dashboard
                </button>
              </Link>
              <Link
                to="/"
                onClick={() => {
                  onLogoutClick();
                }}
              >
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
              <Link to="/signup">
                <button className={`btn-primary ${styles.navButton}`}>
                  Getting Started
                </button>
              </Link>
            </>
          )}
        </div>
        <div
          className={
            activeNav
              ? `${styles.hamburgerBox} ${styles.activeNav}`
              : `${styles.hamburgerBox}`
          }
          onClick={() => {
            setActiveNav(activeNav === false ? true : false);
          }}
        >
          <div className={styles.hamburger} />
        </div>
      </div>
    </div>
  );
}
