import styles from './Dashboard.module.css';
import { activeUserAtom, activeWebsiteAtom, userDataAtom, websitesAtom } from '../../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';
import ClickDataVisualization from '../ChartPages/AllUserData';
function Dashboard() {
  //retrieve user data
  useEffect(() => {
    axios.get('/api/data').then((res) => {
      setUserData(res.data);
      const websiteList:Set<string> = new Set(res.data.map((el:{ website_name: string }) => el.website_name));
      setWebsites(Array.from(websiteList));
    });
  }, []);

  const [user] = useAtom(activeUserAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [websites, setWebsites] = useAtom<string[]>(websitesAtom)
  const [, setActiveWebsite] = useAtom(activeWebsiteAtom)
  // const [websiteData, setWebsiteData] = useAtom(websiteDataAtom);

  function handleWebsiteSelect(e:React.ChangeEvent<HTMLSelectElement>) {
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
      <ClickDataVisualization />
        {/* {if (activeWebsite) websiteData.map(el => (<p>{el.dataset_id}</p>))} */}
      </div>
      
    </div>
  );
}

export default Dashboard;
