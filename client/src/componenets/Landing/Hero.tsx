import React from 'react';
import styles from '../Landing/Hero.module.css';

export default function Hero() {
  return <section className={styles.hero}>
    <div className={styles.titleBox}>
        <h1>Easy Implementation</h1>
        <h1 className="primary">Endless Information</h1>
    </div>
    <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo fugiat voluptatum assumenda odio blanditiis reprehenderit aperiam porro laborum vitae ratione voluptatem, accusantium totam optio quaerat quam a modi? Provident, perferendis!</h4>
    <div className={styles.heroButtons}>
        <button className="btn-primary">Get started</button>
        <button className="btn-secondary">Documentation</button>
    </div>
  </section>;
}
