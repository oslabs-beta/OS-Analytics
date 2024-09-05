import styles from './UserView.module.css'
import {
  activeUserAtom,
  activeWebsiteAtom,
  userDataAtom,
  websitesAtom,
  backendUrl
} from '../../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';
import ClickDataVisualization from '../ChartPages/AllUserData';
import ClickDataVisualizationWebsite from '../ChartPages/WebsiteData';
import TimeFrameDropdown from '../ChartPages/TimeFrameDropdown';
function Dashboard() {
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get(`${backendUrl}/api/data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setUserData(res.data); 
      const websiteList: Set<string> = new Set(
        res.data.map((el: { website_name: string }) => el.website_name)
      );
      setWebsites(Array.from(websiteList));
    });
  }, []);

  const [activeUser] = useAtom(activeUserAtom);
  const [, setUserData] = useAtom(userDataAtom);
  const [websites, setWebsites] = useAtom(websitesAtom);
  const [activeWebsite, setActiveWebsite] = useAtom(activeWebsiteAtom);

  function handleWebsiteSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setActiveWebsite(e.target.value);
  }

  return (
    
    <section className={styles.dashboard}>
      
      <div className={styles.dashboardHeader}>
        {/* <select className="dropdown"
          onChange={(e) => {
            handleWebsiteSelect(e);
          }}
        >
          <option value={undefined}>Data Across All Websites</option>
          {websites.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select> */}
        <TimeFrameDropdown />
      </div>

      <div>

          {activeWebsite === 'Select website' ? (
          <ClickDataVisualization />
        ) : (
          <ClickDataVisualizationWebsite />
        )}
        </div>
        

    </section>
  );
}
export default Dashboard;
