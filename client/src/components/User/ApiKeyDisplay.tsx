import { useState, useEffect } from 'react';
import { IconButton, InputAdornment, TextField, Box } from '@mui/material';
import { Visibility, VisibilityOff, FileCopy, Check } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

const ApiKeyDisplay = () => {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get('/api/auth/getApiKey', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApiKey(response.data.apiKey);
            } catch (error) {
                console.error('Error fetching API key:', error);
            }
        };

        fetchApiKey();
    }, [token]);

    const handleToggleVisibility = () => {
        setShowKey(!showKey);
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000); 
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
                type={showKey ? 'text' : 'password'}
                value={showKey ? apiKey : '*************************************************'}
                InputProps={{
                    readOnly: true,
                    sx: {
                        width: '400px',
                        background: 'none',
                        color: '#bfbfbf',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bfbfbf',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bfbfbf',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bfbfbf',
                        },
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleToggleVisibility}
                                sx={{
                                    color: 'white',
                                    '&:focus': {
                                        outline: 'none',
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                {showKey ? <VisibilityOff fontSize="small" sx={{ color: '#bfbfbf' }} /> : <Visibility fontSize="small" sx={{ color: '#bfbfbf' }} />}
                            </IconButton>
                            <CopyToClipboard text={apiKey} onCopy={handleCopy}>
                                <IconButton
                                    size="small"
                                    sx={{ 
                                        color: 'white',
                                        '&:focus': {
                                            outline: 'none',
                                            boxShadow: 'none',
                                        }
                                    }}
                                >
                                    {copied ? <Check fontSize="small" sx={{ color: 'white' }} /> : <FileCopy fontSize="small" sx={{ color: '#bfbfbf' }} />}
                                </IconButton>
                            </CopyToClipboard>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                size="small"
            />
        </Box>
    );
};

export default ApiKeyDisplay;
