import styles from './Animations.module.css';

export default function BarAnimation() {


function getHeight() {
  return Math.floor(Math.random()*70)+20;
}


  return (
    <div className={styles.barContainer}>
        <div style={{height: `${getHeight()}%`}} className={styles.bar} id={styles.red}></div>
        <div style={{height: `${getHeight()}%`}} className={styles.bar} id={styles.blue}></div>
        <div style={{height: `${getHeight()}%`}} className={styles.bar} id={styles.yellow}></div>
    </div>
  )
}
