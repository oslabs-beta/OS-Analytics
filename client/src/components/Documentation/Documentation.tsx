import Navbar from '../Navbar/Navbar';
import NavMobile from '../Navbar/NavMobile';
import styles from './Documentation.module.css';

const Documentation = () => {
  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <div className={styles.sectionWrapper}>
        <section className={styles.docs}>
          <h2>Getting started</h2>
          <article className={styles.docStep}>
            <h3 className="fw-600">Install</h3>
            <p>Install atio from the terminal</p>
            <div className={styles.codeBlock}>
              <code>npm i atio-tools</code>
            </div>
          </article>
          <article className={styles.docStep}>
            <h3 className="fw-600">Insert</h3>
            <p>Add custom hook to your codebase</p>
            <div className={styles.codeBlock}>
              <pre>
                <code>
                  {`
import useClickTracker from 'OSAnalytics'; 

const apiKey = <'your-api-here'>

const website = 'your-website.com''
            
useClickTracker(apiKey, webiste);

function handleLogin() {
  console.log('buttons');
  }`}
                </code>
              </pre>
            </div>
          </article>
          <article className={styles.docStep}>
            <h3>Test</h3>
            <p>
              You can now engage with your website while still in development.
              Visit your website and perform a click event. Then log in to the
              dashboard and see if your website has successfully been added.
            </p>
            <p>
              Once you've verified that the data is successfully being
              collected, you're done! You can now finish development and deploy
              your product. It will still pass all click data to our database.
              Use the filter options to view your data or the export options to
              download and share your graphs.
            </p>
            <div className={styles.codeBlock}></div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
