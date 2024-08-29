import Navbar from '../Navbar/Navbar';
import NavMobile from '../Navbar/NavMobile';
import styles from './Documentation.module.css';

const Documentation = () => {
  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <section className={styles.docs}>
        <h2>Getting started</h2>
        <article>
          <h3>Install</h3>
          <p>Install atio from the terminal</p>
          <div className={styles.codeBlock}>
          <code>npm i atio-tools</code>
          </div>
        
        </article>
        <article>
          <h3>Insert</h3>
          <p>Add custom hook to your codebase</p>
          <div className={styles.codeBlock}>
          <code>{`const apiKey = <'your-api-here'>`}</code>
          
          <code>{`const apiKey = 'your-api-here'`}</code>
          </div>
        
        </article>
      </section>
    </div>
  );
};

export default Documentation;


// const apiKey = 'your-api-here' //dummy data api key
// //exact website link!
// ${''}
// const webiste = 'your-website.com'
// ${''}
// useClickTracker(apiKey, webiste);

//   function handleLogin() {
//     console.log('buttons');
//   }
        