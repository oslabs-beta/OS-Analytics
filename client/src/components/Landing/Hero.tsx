import styles from '../Landing/Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.heroBackground}>
      <section className={styles.hero}>
        <div className={styles.titleBox}>
          <h1>Easy Implementation</h1>
          <h1 className={styles.orange}>Endless Information</h1>
        </div>
        <h4>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
          fugiat voluptatum assumenda odio blanditiis reprehenderit aperiam
          porro laborum vitae ratione voluptatem, accusantium totam optio
          quaerat quam a modi? Provident, perferendis!
        </h4>
        <div className={styles.heroButtons}>
          <button className="btn-primary btn-animated">Create account</button>
          <button className="btn-secondary btn-animated">Documentation</button>
        </div>
      </section>
    </div>
  );
}
