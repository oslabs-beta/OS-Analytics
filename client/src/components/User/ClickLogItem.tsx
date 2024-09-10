import { useEffect, useState } from 'react';
import styles from './ClickLog.module.css';

function ClickLogItem(item) {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  // console.log(item)
  useEffect(() => {
    const date = new Date(item.item.created_at);
    const localDate = date.toLocaleString().split(' ');
    setDate(localDate[0].slice(0, -1));
    setTime(localDate[1] + ' ' + localDate[2]);
  }, []);
//How did David get the browser name?


  return (
    <tr>
      <td>{date}</td>
      <td>{time}</td>
      <td>click</td>
      <td className={styles.noWrap}>{item.item.element}</td>
      <td className={styles.noWrap}>{item.item.user_browser.slice(0,7)}</td>
      <td className={styles.textRight}>{item.item.user_os}</td>
      <td>
       {item.item.website_name}
      </td>
    </tr>
  );
}

export default ClickLogItem;
