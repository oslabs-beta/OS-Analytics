import styles from '../Landing/Hero.module.css';
import demoImg from '../../assets/dashboard-google-analytics-sexy.png';
import { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3fafff,
      backgroundColor: 0x1c1a4a,
      THREE: THREE,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className={styles.heroBackground}>
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={styles.heroLeft}
        >
          <h1>Open Source Website Analytic Toolkit For Developers</h1>
          <h4>
            OS Analytics is an open source, developer friendly tool for tracking
            the traffic and user interactions of any deployed application. Our goal is to give developers the tools they need to monitor user interactions without relying on third party products.
          </h4>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className={styles.heroButtons}
          >
            <Link to="/signup">
              <button className="button btn-primary btn-animated">
                Create account
              </button>
            </Link>

            <Link to="/docs">
              <button className="button btn-secondary btn-animated">
                Documentation
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className={styles.heroRight}
        >
          <img className={styles.heroDemo} src={demoImg} alt="product demo" />
        </motion.div>
      </section>
    </div>
  );
}
