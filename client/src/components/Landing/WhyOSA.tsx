import { useEffect, useRef, useState } from 'react';
import styles from './WhyOSA.module.css';
import icon from '../../assets/icons/graphs.png';
import globe from '../../assets/icons/blackGlobe.png';
import aiImage from '../../assets/icons/aiImage.png';
import clickImage from '../../assets/icons/clickImage.png';
import { motion } from 'framer-motion';

export default function WhyOSA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.whyOSA}>
   <motion.h3
  initial={{ opacity: 0, y: 20 }} 
  animate={isVisible ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.8 }} 
  style={{ fontWeight: '600', color: 'var(--black)' }}
>
        Why OS Analytics?
      </motion.h3>
      <div className={styles.whyGrid}>
        {[{
          img: clickImage,
          title: 'Custom Click Tracking',
          description: 'Easily integrate our clickTracker to monitor user clicks and interactions.'
        }, {
          img: icon,
          title: 'Real-Time Analytics',
          description: 'Capture and visualize user activity data in real-time using our robust dashboard.'
        }, {
          img: globe,
          title: 'Multiple Website Support',
          description: 'Track and manage multiple websites effortlessly through the dashboard.'
        }, {
          img: aiImage,
          title: 'AI-Powered Reports',
          description: 'Leverage AWS Bedrock for generating insightful and comprehensive activity reports.'
        }].map((item, index) => (
          <motion.div
            key={index}
            className={styles.whyItem}
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 * index, duration: 1 }}
          >
            <div className={styles.iconBox}>
              <img className={styles.whyIcon} src={item.img} alt={item.title} />
            </div>
            <div className={styles.whyContentBox}>
              <h3 style={{ fontWeight: '600', color: 'var(--black)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--gray-text)' }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
