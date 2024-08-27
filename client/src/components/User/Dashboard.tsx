import styles from './Dashboard.module.css';
import { activeUserAtom, userDataAtom } from '../../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import ClickDataVisualization from '../ChartPages/AllUserData';

function Dashboard() {
  //retrieve user data
  // useEffect(() => {
  //   axios.get('/api/data').then(res => {
  //     setUserData(res.data);
  //     console.log(res.data);

  //   });
  // }, []);  

  const [user] = useAtom(activeUserAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [websites, setWebsites] = useState('hey');

  return (
    <div className={styles.dashboard}>
      
      <h1>{`Welcome back, ${user}`}</h1>
      <ClickDataVisualization />
    </div>
  );
}

export default Dashboard;
