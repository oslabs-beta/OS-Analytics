import { useEffect, useState } from 'react';
import styles from './ClickLog.module.css';
import { ClickLogProps } from '../../../types';

function ClickLogItem({item}:ClickLogProps) {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const date = new Date(item.time);
    const localDate = date.toLocaleString().split(' ');
    setDate(localDate[0].slice(0, -1));
    setTime(localDate[1] + ' ' + localDate[2]);
  }, []);



  return (
    <tr className={styles.ClickLogItem}>
      <td className={styles.noWrap}>{date}</td>
      <td className={styles.noWrap}>{time}</td>
      <td className={styles.noWrap}>click</td>
      <td className={styles.noWrap}>{item.element+' '+ item.dataset_id}</td>
      <td className={styles.noWrap}>{item.user_browser.slice(0,7)}</td>
      <td className={styles.noWrap}>{item.user_os}</td>
      <td className={styles.noWrap}>
       {item.website}
      </td>
    </tr>
  );
}

export default ClickLogItem;
