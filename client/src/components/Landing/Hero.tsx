import styles from '../Landing/Hero.module.css';
import demoImg from '../../assets/dashboard-google-analytics-sexy.png';
import { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

export default function Hero() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
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
        <div className={styles.heroLeft}>
          <h1>Open Source Website Analytic Toolkit For Developers</h1>
          <h4>
            OS Analytics is an open source, developer friendly tool for tracking
            the traffic and user interactions of any deployed application. Our goal is to give developers the tools they need to monitor user interactions without relying on third party products.
          </h4>
          <div className={styles.heroButtons}>
            
          <Link to="/signup">
                <button className={"button btn-primary btn-animated"}>
                  Create account
                </button>
              </Link>

              <Link to="/docs">
                <button className={"button btn-secondary btn-animated"}>
                Documentation
                </button>
              </Link>
       
          </div>
        </div>
        <div className={styles.heroRight}>
          <img className={styles.heroDemo} src={demoImg} alt="product demo" />
        </div>
        
      </section>
      
    </div>
  );
}
