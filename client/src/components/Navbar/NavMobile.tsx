import { Link } from 'react-router-dom';
import styles from './NavMobile.module.css';
import { useAtom } from 'jotai';
import { activeNavAtom, activeUserAtom } from '../../state/Atoms';

export default function NavMobile() {
  const [activeNav, setActiveNav] = useAtom(activeNavAtom);
  const [activeUser] = useAtom(activeUserAtom);

  return (
    <div
      className={
        activeNav
          ? `${styles.navMobile}`
          : `${styles.navMobile} ${styles.offScreenLeft}`
      }
    >
      <ul className={styles.mobileLinks}>
        {activeUser ? (
          <>
            <li className={styles.mobileLink}>
              <Link
                to="/"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>Dashboard</h3>
              </Link>
            </li>
            <li className={styles.mobileLink}>
              <Link
                to="/"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>Websites</h3>
              </Link>
            </li>
            <li className={styles.mobileLink}>
              <Link
                to="/"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>Settings</h3>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.mobileLink}>
              <Link
                to="/"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>Home</h3>
              </Link>
            </li>
            <li className={styles.mobileLink}>
              <Link
                to="/documentation"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>Documentation</h3>
              </Link>
            </li>
            <li className={styles.mobileLink}>
              <Link
                to="/about"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>About</h3>
              </Link>
            </li>
            <li className={styles.mobileLink}>
              <Link
                to="/contact"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <h3>Contact</h3>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}