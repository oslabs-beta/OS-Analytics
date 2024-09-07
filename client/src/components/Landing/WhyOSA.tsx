import styles from './WhyOSA.module.css';
import icon from '../../assets/icons/chart.png';

export default function WhyOSA() {
  return (
    <section className={styles.whyOSA}>
      <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
        Why OS Analytics?
      </h3>
      <div className={styles.whyGrid}>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={icon} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
              Custom Attributes and Actions
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium consequuntur odit exercitationem.
            </p>
          </div>
        </div>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={icon} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
              Custom Attributes and Actions
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium consequuntur odit exercitationem.
            </p>
          </div>
        </div>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={icon} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
              Custom Attributes and Actions
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium consequuntur odit exercitationem.
            </p>
          </div>
        </div>
        <div className={styles.whyItem}>
          <div className={styles.iconBox}>
            <img className={styles.whyIcon} src={icon} alt="chart-icon" />
          </div>
          <div className={styles.whyContentBox}>
            <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
              Custom Attributes and Actions
            </h3>
            <p style={{ color: 'var(--gray-text' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium consequuntur odit exercitationem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
