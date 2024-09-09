import { useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import { Visibility, VisibilityOff, FileCopy, Check } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const ApiKeyDisplay = ({ data }: { data: string }) => {
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);

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
        <Box sx={{ position: 'relative', width: '450px' }}>
            <TextField
                type={showKey ? 'text' : 'password'}
                value={ data ? (showKey ? data : '*************************************************') : ''}
                InputProps={{
                    readOnly: true,
                    sx: {
                        background: 'none',
                        color: '#333333',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#333333',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#333333',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#333333',
                        },
                    },
                }}
                variant="outlined"
                size="small"
                fullWidth
            />
            <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 1, pr: 1 }}>
                <IconButton
                    onClick={handleToggleVisibility}
                    sx={{
                        color: 'black',
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        }
                    }}
                >
                    {showKey ? <VisibilityOff fontSize="small" sx={{ color: '#333333' }} /> : <Visibility fontSize="small" sx={{ color: '#333333' }} />}
                </IconButton>
                <CopyToClipboard text={data} onCopy={handleCopy}>
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
                        {copied ? <Check fontSize="small" sx={{ color: 'black' }} /> : <FileCopy fontSize="small" sx={{ color: '#333333' }} />}
                    </IconButton>
                </CopyToClipboard>
            </Box>
        </Box>
    );
};

export default ApiKeyDisplay;
