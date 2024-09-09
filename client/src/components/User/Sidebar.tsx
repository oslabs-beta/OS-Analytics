import styles from './UserView.module.css';
import logo from '../../assets/icons/pie-chart.png';
import chart from '../../assets/icons/chart.png';
import { Link, NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { websitesAtom, activeWebsiteAtom } from '../../state/Atoms';

function Sidebar() {
  const [websites] = useAtom(websitesAtom); 
  const [, setSelectedWebsite] = useAtom(activeWebsiteAtom);

  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <div className={styles.logoBox}>
          <img className={styles.sideLogo} src={logo} alt="AT.io" />
          <h3>OS Analytics</h3>
        </div>
      </Link>
      <div className={styles.websiteList}>
        <ul className={styles.websiteLinks}>
          <li className={styles.websiteItem}>
            <NavLink
              to="/dashboard/overview" 
              className={styles.sidebarLink}
              onClick={() => setSelectedWebsite('overview')}
            >
              <img className={styles.sideIcon} src={chart} alt="overview" />
              <span className={styles.sidebarSpan}>{"Overview"}</span>
            </NavLink>
          </li>    
          {websites.map((website, index) => (
            <li key={index} className={styles.websiteItem}>
              <NavLink
                to={`/dashboard/${website}`} 
                className={styles.sidebarLink}
                onClick={() => setSelectedWebsite(website)} 
              >
                <img className={styles.sideIcon} src={chart} alt={website} />
                <span className={styles.sidebarSpan}>{website}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
