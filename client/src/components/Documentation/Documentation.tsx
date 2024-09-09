import styles from "./Documentation.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "../User/Sidebar";
import NavbarDashboard from "../Navbar/NavbarDashboard";
const Documentation = () => {
  return (
    <div className="viewWithSide">
      <NavbarDashboard />
      <Sidebar />
      <div className={styles.sectionWrapper}>
        <section className={styles.docs}>
          <h1 className="fw-600">Getting Started</h1>
          <br />
          <article className={styles.docStep}>
            <h3 className="fw-600">Step 1: Installation</h3>
            <p>
              To begin, install <strong>os-analytics</strong> via the terminal:
            </p>

            <SyntaxHighlighter
              language="bash"
              style={vscDarkPlus}
              className={styles.codeBlock}
            >
              npm install os-analytics
            </SyntaxHighlighter>
          </article>

          <article className={styles.docStep}>
            <h3 className="fw-600">Step 2: Integrate the Custom Hook</h3>
            <p>
              Add the <strong>clickTracker</strong> hook at the top level of
              your React app:
            </p>

            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              className={styles.codeBlock}
            >
              {`
  import clickTracker from 'os-analytics';

  const apiKey = '2e0397b7-6cda-4806-8762-136d4a4591af'; // Example API key
  const website = 'test.com'; // Example website

  clickTracker(apiKey, website); // Initialize tracking
                `}
            </SyntaxHighlighter>
          </article>

          <article className={styles.docStep}>
            <h3 className="fw-600">Step 3: Example Integration</h3>
            <p>Here's how you can use this hook in a typical React project:</p>

            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              className={styles.codeBlock}
            >
              {`
  import clickTracker from 'os-analytics';

  function App() {
    const apiKey = '2e0397b7-6cda-4806-8762-136d4a4591af'; // Example API key
    const website = 'test.com';

    clickTracker(apiKey, website); // Initialize tracking

    return (
      <div className="app">
        <h1>OS Analytics Demo</h1>
        <div className="button-row">
          <HeatButton name="Button 1" />
          <HeatButton name="Button 2" />
          <HeatButton name="Button 3" />
        </div>
      </div>
    );
  }

  export default App;
                `}
            </SyntaxHighlighter>
          </article>

          <article className={styles.docStep}>
            <h3 className="fw-600">Step 4: Testing Your Integration</h3>
            <p>
              After adding the hook, interact with your website during
              development to trigger click events. Once you’ve engaged with the
              site, log in to the <strong>OS Analytics</strong> dashboard to
              verify that your data is being collected.
            </p>
            <p>
              After confirming that the tracking works, you're ready to deploy!
              Your click data will continue to be collected in real-time, even
              in production. Use the dashboard’s filters to analyze your data,
              or export it for sharing and reporting purposes.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
