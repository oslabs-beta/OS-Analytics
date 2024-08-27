import styles from './Dashboard.module.css';
import { activeUserAtom, activeWebsiteAtom, userDataAtom, websiteDataAtom, websitesAtom } from '../../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

function Dashboard() {
  //retrieve user data
  useEffect(() => {
    axios.get('/api/data').then((res) => {
      setUserData(res.data);
      const websiteList = new Set(res.data.map((el) => el.website_name));
      setWebsites([...websiteList]);
    });
  }, []);

  const [activeUser] = useAtom(activeUserAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [websites, setWebsites] = useAtom(websitesAtom)
  const [activeWebsite, setActiveWebsite] = useAtom(activeWebsiteAtom)
  const [websiteData, setWebsiteData] = useAtom(websiteDataAtom);

  function handleWebsiteSelect(e) {
    setActiveWebsite(e.target.value);
  }

  return (
    <div className={styles.dashboard}>
      <h2>{`Welcome back, ${activeUser}`}</h2>
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
            (el) => el.website_name === site
          ).length;

          return (
            <li>
              <h4>{`${site}: ${totalClicks}`}</h4>
            </li>
          );
        })}
      </ul>
      <div>
        {/* {if (activeWebsite) websiteData.map(el => (<p>{el.dataset_id}</p>))} */}
      </div>
      
    </div>
  );
}

export default Dashboard;
