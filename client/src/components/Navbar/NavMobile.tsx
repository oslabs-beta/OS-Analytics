import { Link } from 'react-router-dom';
import styles from './NavMobile.module.css';
import { useAtom } from 'jotai';
import { activeNavAtom } from '../../state/Atoms';

export default function NavMobile() {
  const [activeNav, setActiveNav] = useAtom(activeNavAtom);

  return (
    <div
      className={
        activeNav
          ? `${styles.navMobile}`
          : `${styles.navMobile} ${styles.offScreenLeft}`
      }
    >
      <ul className={styles.mobileLinks}>
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
          <Link to="/">
            <h3>Documentation</h3>
          </Link>
        </li>
        <li className={styles.mobileLink}>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </li>
        <li className={styles.mobileLink}>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </li>
        <li className={styles.mobileLink}>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}
