import styles from './Dashboard.module.css';
import { activeUserAtom, activeWebsiteAtom, userDataAtom, websitesAtom } from '../../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';
import ClickDataVisualization from '../ChartPages/AllUserData';
import ClickDataVisualizationWebsite from '../ChartPages/WebsiteData';
function Dashboard() {
  //retrieve user data
  useEffect(() => {
    axios.get('http://ec2-13-52-215-70.us-west-1.compute.amazonaws.com:8080/api/data').then((res) => {
      setUserData(res.data);
      const websiteList:Set<string> = new Set(res.data.map((el:{ website_name: string }) => el.website_name));
      setWebsites(Array.from(websiteList));
    });
  }, []);

  const [user] = useAtom(activeUserAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [websites, setWebsites] = useAtom(websitesAtom)
  const [activeWebsite, setActiveWebsite] = useAtom(activeWebsiteAtom)

  function handleWebsiteSelect(e:any) {
    setActiveWebsite(e.target.value);
  }

  return (
    <div className={styles.dashboard}>
      <h2>{`Welcome back, ${user}`}</h2>
      <select
        onChange={(e) => {
          handleWebsiteSelect(e);
        }}
        
      >
        <option value={undefined}>Select website</option>
        {websites.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <ul>
        {websites.map((site) => {
          const totalClicks = userData.filter(
            (el:any) => el.website_name === site
          ).length;

          return (
            <li>
              <h4>{`${site}: ${totalClicks}`}</h4>
            </li>
          );
        })}
      </ul>
      <div>
      {activeWebsite === 'Select website' ? (
          <ClickDataVisualization />
        ) : (
          <ClickDataVisualizationWebsite />
        )}
      </div>
    </div>
  );
}
export default Dashboard;