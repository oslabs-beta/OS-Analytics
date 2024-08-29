import { Link } from 'react-router-dom';
import styles from './NavMobile.module.css';
import { useAtom } from 'jotai';
import { activeNavAtom, activeUserAtom } from '../../state/Atoms';

export default function NavMobile() {
  const [activeNav, setActiveNav] = useAtom(activeNavAtom);
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);

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
           
           <Link
                to="/dashboard"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                <li className={`${styles.mobileLink} ${styles.dashboardLink}`}>
                <h3>Dashboard</h3>
                </li>
              </Link>
         
              <Link
                to="/websites"
                onClick={() => {
                  setActiveNav(false);
                }}
              >   <li className={styles.mobileLink}>
                <h3>Websites</h3>
                </li>
              </Link>
               <Link
                to="/documenation"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                   <li className={styles.mobileLink}>
                <h3>Documentation</h3>
                </li>
              </Link>
         
              <Link
                to="/settings"
                onClick={() => {
                  setActiveNav(false);
                }}
              >
                   <li className={styles.mobileLink}>
                <h3>Settings</h3>
                </li>
              </Link>
             
              <Link
                to="/"
                onClick={() => {
                  setActiveNav(false)
                  setActiveUser('');
                }}
              >  <li className={`${styles.mobileLink} ${styles.dashboardLink}`}>
                <h3>Sign out</h3>
                </li>
              </Link>
          </>
        ) : (
          <>
              <Link
                to="/"
                onClick={() => {
                  setActiveNav(false);
                }}
              > <li className={styles.mobileLink}>
                <h3>Home</h3>
                </li>
              </Link>
         
           
              <Link
                to="/docs"
                onClick={() => {
                  setActiveNav(false);
                }}
              > <li className={styles.mobileLink}>
                <h3>Documentation</h3>
                </li>
              </Link>
           
         
              <Link
                to="/signup"
                onClick={() => {
                  setActiveNav(false);
                }}
              >   <li className={styles.mobileLink}>
                <h3>Create account</h3>
                </li>
              </Link>
              <Link
                to="/team"
                onClick={() => {
                  setActiveNav(false);
                }}
              > <li className={styles.mobileLink}>
                <h3>Team</h3>
                </li>
              </Link>

              <Link
                to="/login"
                onClick={() => {
                  setActiveNav(false);
                }}
                >   <li className={styles.mobileLink}>
                <h3>Login</h3>
                </li>
              </Link>
              <Link to = "/signin">
                <li className={styles.mobileLink}>
                <h3>Sign in</h3>
                </li>
              </Link>
          
          </>
        )}
      </ul>
    </div>
  );
}