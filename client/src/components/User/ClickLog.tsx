import { useAtom } from 'jotai';
import styles from './ClickLog.module.css';

import ClickLogItem from './ClickLogItem';
import { userDataAtom } from '../../state/Atoms';
import { useState } from 'react';

function ClickLog() {
    const [userData] = useAtom(userDataAtom);
    const mappedData = mapUserData(userData);
    // const [displayedItems, setDisplayedItems] = useState([])
    let displayedItems = []

    //date
    //time
    //interaction
    //element name
    //browser
    //os
    //website name
    function newItems() {
        for (let i = 0; i <10; i++)
            displayedItems.push(<ClickLogItem item={mappedData[i]} key={i} />)
    }
    newItems();
  return (
    <div className={styles.ClickLog}>
      <div className="admin-header">
        <h2>Recent User Interacitons</h2>
      </div>

      <table className={styles.ClickLogItems}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Interaction</th>
            <th>Element</th>
            <th>Browser</th>
            <th>OS</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
{displayedItems}
        </tbody>
      </table>
    </div>
  );
}

export default ClickLog;
