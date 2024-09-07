import styles from './Animations.module.css';

export default function BarAnimation() {
  return (
    <div className={styles.barContainer}>
        <div className={styles.bar} id={styles.red}></div>
        <div className={styles.bar} id={styles.green}></div>
        <div className={styles.bar} id={styles.yellow}></div>
    </div>
  )
}
