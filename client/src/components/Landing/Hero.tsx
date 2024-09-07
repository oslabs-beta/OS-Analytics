import styles from '../Landing/Hero.module.css';
import demoImg from '../../assets/mock-demo.png'

export default function Hero() {
  return (
    <div className={styles.heroBackground}>
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1>Open Source Website Analytic Toolkit For Developers</h1>

        <h4>
          OS Analytics is an open source, developer friendly tool for tracking the traffic and user interactions of any deployed application. Our goal is to give developers the tools they need to monitor user interactions without relying on third party products.
        </h4>
        <div className={styles.heroButtons}>
          <button className="btn-primary btn-animated">Create account</button>
          <button className="btn-secondary btn-animated">Documentation</button>
        </div>
        </div>
        <div className={styles.heroRight}>
          <img className={styles.heroDemo} src={demoImg} alt="product demo" />
        </div>
      </section>
    </div>
  );
}
