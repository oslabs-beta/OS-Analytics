import styles from './WhyOSA.module.css';
import icon from '../../assets/icons/graphs.png';
import globe from '../../assets/icons/blackGlobe.png'
import aiImage from '../../assets/icons/aiImage.png'
import clickImage from '../../assets/icons/clickImage.png'

export default function WhyOSA() {
  return (
    <section className={styles.whyOSA}>
      <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
        Why OS Analytics?
      </h3>
      <div className={styles.whyGrid}>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={clickImage} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
            Custom Click Tracking
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
            Easily integrate our clickTracker to monitor user clicks and interactions.
            </p>
          </div>
        </div>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={icon} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
            Real-Time Analytics
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
            Capture and visualize user activity data in real-time using our robust dashboard.
            </p>
          </div>
        </div>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={globe} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
            Multiple Website Support
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
            Track and manage multiple websites effortlessly through the dashboard.
            </p>
          </div>
        </div>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={aiImage} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)'}}>
              AI-Powered Reports
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
            Leverage AWS Bedrock for generating insightful activity reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
