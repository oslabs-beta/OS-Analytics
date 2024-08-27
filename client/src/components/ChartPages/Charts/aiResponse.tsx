import { useState } from 'react';
import { Button, TextField, CircularProgress, Box } from '@mui/material';

const AiResponseComponent = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleButtonClick = async () => {
    setLoading(true);
    try {
        //not working
      //const result = await axios.get('/api/ai/bedrock');
      // setResponse(result.data);
    } catch (error) {
      setResponse('Error fetching AI response');
    }
    setLoading(false);
  };

  return (
    <Box 

    >
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleButtonClick} 
        disabled={loading}
        sx={{ 
          textTransform: 'none', 
          fontSize: '16px', 
          padding: '10px 20px', 
          borderRadius: '8px' 
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Get AI Response'}
      </Button>

      <TextField
        multiline
        rows={6}
        variant="outlined"
        margin="normal"
        fullWidth
        value={response}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          mt: 3,
          backgroundColor: 'white',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#aaa',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3f51b5',
            },
          },
        }}
        placeholder="AI response..."
      />
    </Box>
  );
};

export default AiResponseComponent;
