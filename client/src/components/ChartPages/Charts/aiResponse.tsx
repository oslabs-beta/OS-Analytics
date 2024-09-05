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

const AiResponseComponent = () => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<boolean>(false)
  const [response, setResponse] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
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
          }
        }
      };

      typewriter();
    }
  }, [response]);

  const handleButtonClick = async () => {
    // console.log(timeFrame, website);
    setDisplayedText([]);
    setLoading(true);
    try {
      const result = await axios.post(
        'http://ec2-13-52-215-70.us-west-1.compute.amazonaws.com:8080/api/ai/bedrock',
        { timeFrame, website },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(result.data.results[0].outputText.split('\n'));
    } catch (error) {
      setResponse(['Error fetching AI response']);
    }
    setLoading(false);
    setAiResponse(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.044)',
          color: '#bfbfbf',
          padding: '20px',
          width: '700px',
          aspectRatio: '7/5',
          overflowY: 'auto',
          maxWidth: '92vw',
          border: '1px solid var(--gray-border)',
          borderRadius: '8px',
        }}
      >
        <Button
          id="ai"
          variant="contained"
          onClick={handleButtonClick}
          disabled={loading}
          style={
            loading
              ? { backgroundColor: 'var(--green-secondary' }
              : { backgroundColor: `${aiResponse ? 'var(--orange-primary' : 'var(--green-secondary)'}` }
          }
          sx={{
            textTransform: 'none',
            fontSize: '16px',
            padding: '1rem 2rem',
            width: '100%',
            height: '3.2rem',
            display: 'flex',
            borderRadius: '8px',
            // backgroundColor: "#E0E0E0",
            // color: "#333333",
            color: 'var(--white)',
            '&:hover': {
              // backgroundColor: "#D5D5D5",
              backgroundColor: 'var(--orange-primary)',
            },
            fontFamily: "'Roboto Mono', monospace",
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `${aiResponse? 'AI Response' : 'Get AI Response'}`
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
                  color: '#bfbfbf',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default AiResponseComponent;
