import { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { timeFrameAtom, activeWebsiteAtom } from '../../../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { backendUrl } from '../../../state/Atoms';
import styles from '../Charts.module.css';

const AiResponseComponent = () => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<boolean>(false);;
  const [response, setResponse] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [typewriterFinished, setTypewriterFinished] = useState<boolean>(false); 
  const [timeFrame] = useAtom(timeFrameAtom);
  const [website] = useAtom(activeWebsiteAtom);
  const token = localStorage.getItem('token');
  const theme = createTheme({
    typography: {
      fontFamily: "'Roboto Mono', monospace",
    },
  });

  useEffect(() => {
    if (response.length > 0) {
      let lineIndex = 0;
      let charIndex = -1;
      setDisplayedText([]);
      setTypewriterFinished(false);

      const typewriter = () => {
        if (
          lineIndex < response.length &&
          charIndex <= response[lineIndex].length
        ) {
          setDisplayedText((prev) => {
            const updatedText = [...prev];
            if (!updatedText[lineIndex]) {
              updatedText[lineIndex] = '';
            }
            updatedText[lineIndex] += response[lineIndex]?.[charIndex] || '';
            return updatedText;
          });

          charIndex++;

          if (charIndex >= response[lineIndex].length) {
            lineIndex++;
            charIndex = 0;
          }

          if (lineIndex < response.length) {
            setTimeout(typewriter, 5);
          } else {
            setTypewriterFinished(true);
          }
        }
      };

      typewriter();
    }
  }, [response]);

  const handleButtonClick = async () => {
    setTypewriterFinished(false);
    setDisplayedText([]);
    setLoading(true);
    try {
      const result = await axios.post(
        `${backendUrl}/api/ai/bedrock`,
        { timeFrame, website },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(result.data.results[0].outputText.split('\n'));
    } catch (error: any) {
      setResponse([error.response.data.message]);
    }
    setLoading(false);
    setAiResponse(true);
  };

  const handleSaveLog = () => {
    const blob = new Blob([response.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ai-response-log-${new Date().toISOString()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={styles.chartBox}
        sx={{
          color: 'red',
          overflowY: 'auto',
          minHeight: '400px',
          width: '100%',
          placeContent: 'start',
          border: '1px solid var(--blue-secondary)',
          padding: '20px',
          background: 'transparent',
        }}
      >
        <Button
          id="ai"
          variant="contained"
          onClick={handleButtonClick}
          disabled={loading}
          style={
            loading
              ? { backgroundColor: 'var(--blue-primary', width: '100%' }
              : {
                  backgroundColor: `${
                    aiResponse ? 'var(--blue-primary' : 'var(--blue-primary)'
                  }`,
                  width: '100%',
                }
          }
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            padding: '1rem 2rem',

            height: '3.2rem',
            display: 'flex',
            borderRadius: '8px',
            color: 'var(--white)',
            fontFamily: "'Roboto Mono', monospace",
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            `${aiResponse ? 'AI Response' : 'Get AI Response'}`
            `${aiResponse ? 'AI Response' : 'Get AI Response'}`
          )}
        </Button>

        <List sx={{ mt: 3 }}>
          {displayedText.map((item, index) => (
            <ListItem key={index} sx={{ padding: 0 }}>
              <ListItemText
                primary={item}
                sx={{
                  padding: '5px 0',
                  margin: 0,
                  fontFamily: "'Roboto Mono', monospace !important",
                  color: 'black',
                }}
              />
            </ListItem>
          ))}
        </List>
        {typewriterFinished && aiResponse && (
  <Button
    variant="contained"
    onClick={handleSaveLog}
    sx={{
      marginTop: '20px',
      textTransform: 'none',
      fontSize: '16px',
      padding: '1rem 2rem',
      width: '100%',
      height: '3.2rem',
      display: 'flex',
      borderRadius: '8px',
      backgroundColor: 'var(--orange-primary)',
      color: 'var(--white)',
      '&:hover': {
        backgroundColor: 'var(--orange-primary)',
      },
      fontFamily: "'Roboto Mono', monospace",
    }}
  >
    Save Log
  </Button>
)}
      </Box>
    </ThemeProvider>
  );
};

export default AiResponseComponent;
