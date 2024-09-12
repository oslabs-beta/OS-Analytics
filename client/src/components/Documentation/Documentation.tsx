import { Box, Typography, IconButton } from "@mui/material";
import styles from "./Documentation.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { FileCopy, Check } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NavMobile from "../Navbar/NavMobile";
import Navbar from "../Navbar/Navbar";

const CopyButton = ({ text }: {text:string}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <IconButton size="small" className={styles.copyButton}>
        {copied ? <Check color="success" /> : <FileCopy />}
      </IconButton>
    </CopyToClipboard>
  );
};

const Documentation = () => {
  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <div className={styles.sectionWrapper}>
        <section className={styles.docs}>
          <Typography variant="h3" className="fw-600">Getting Started</Typography>
          <br />

          <Box className={styles.docStep} mb={4} p={2} border={1} borderRadius={4}>
            <Typography variant="h4" className="fw-600">Step 1: Installation</Typography>
            <Typography variant="body1">
              <br />
              Install <strong>os-analytics</strong> via terminal:
            </Typography>
            <div className={styles.codeBlockWrapper}>
              <CopyButton text="npm install os-analytics" />
              <SyntaxHighlighter language="bash" style={vscDarkPlus} className={styles.codeBlock}>
                npm install os-analytics
              </SyntaxHighlighter>
            </div>
          </Box>

          <Box className={styles.docStep} mb={4} p={2} border={1} borderRadius={4}>
            <Typography variant="h4" className="fw-600">Step 2: Integrate the Custom Hook</Typography>
            <Typography variant="body1">
              <br />
              You may find your <strong>API KEY</strong> in the settings page after logging in.
              <br />
              At the top level of your React app, add the <strong>clickTracker</strong> hook:
            </Typography>

            <div className={styles.codeBlockWrapper}>
              <CopyButton text={`
  import clickTracker from 'os-analytics';

  const apiKey = '2e0397b7-6cda-4806-8762-136d4a4591af'; // Example API key
  const website = 'test.com';

  clickTracker(apiKey, website); // Initialize tracking
              `} />
              <SyntaxHighlighter language="javascript" style={vscDarkPlus} className={styles.codeBlock}>
                {`
  import clickTracker from 'os-analytics';

  const apiKey = '2e0397b7-6cda-4806-8762-136d4a4591af'; // Example API key
  const website = 'test.com';

  clickTracker(apiKey, website); // Initialize tracking
                `}
              </SyntaxHighlighter>
            </div>
          </Box>

          <Box className={styles.docStep} mb={4} p={2} border={1} borderRadius={4}>
            <Typography variant="h4" className="fw-600">Step 3: Example Integration</Typography>
            <br />
            <Typography variant="body1">Here's a typical React integration:</Typography>
            <div className={styles.codeBlockWrapper}>
              <CopyButton text={`
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
              `} />
              <SyntaxHighlighter language="javascript" style={vscDarkPlus} className={styles.codeBlock}>
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
            </div>
          </Box>

          <Box className={styles.docStep} mb={4} p={2} border={1} borderRadius={4}>
            <Typography variant="h4" className="fw-600">Step 4: Testing Your Integration</Typography>
            <Typography variant="body1">
              <br />
              After adding the hook, interact with your website to trigger click events.
              Verify your data in the <strong>OS Analytics</strong> dashboard.
            </Typography>
            <Typography variant="body1">
              Once confirmed, you're ready to deploy! Your data will be collected in real-time, even in production.
              Use the dashboard’s filters to analyze or export your data for reporting.
            </Typography>
          </Box>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
