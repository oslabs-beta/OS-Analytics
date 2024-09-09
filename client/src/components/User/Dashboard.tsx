import styles from './UserView.module.css';
import { activeUserAtom, activeWebsiteAtom } from '../../state/Atoms';
import { useAtom } from 'jotai';
import AllUserData from '../ChartPages/AllUserData';
import WebsiteData from '../ChartPages/WebsiteData';
import TimeFrameDropdown from '../ChartPages/TimeFrameDropdown';
import SelectWebsiteDropDown from '../ChartPages/SelectWebsiteDropdown';
import populateAtoms from '../../services/populateAtoms';
function Dashboard() {
  populateAtoms();
  const [activeUser] = useAtom(activeUserAtom);
  const [activeWebsite] = useAtom(activeWebsiteAtom);

  return (
    <section className={styles.dashboard}>
      <div className={styles.chartBox}>
      
        <TimeFrameDropdown />
      </div>
      <a href="http://localhost:3001" target="_blank">
        Go to Localhost:3001
      </a>

      {activeWebsite === 'All Websites' ? <AllUserData /> : <WebsiteData />}
    </section>
  );
}
export default Dashboard;
