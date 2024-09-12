import { useAtom } from 'jotai';
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import styles from '../User/UserView.module.css';
import { websitesAtom, activeWebsiteAtom } from '../../state/Atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TimeFrameDropdown = () => {
  const navigate = useNavigate();
  const [websites] = useAtom(websitesAtom); 
  const [, setSelectedWebsite] = useAtom(activeWebsiteAtom);
  const [displayedData, setDisplayedData] = useState('Overview')

    return  (
      <Box
        className={styles.websiteDropdown}
        sx={{
          alignItems: "center",
          justifyContent: 'center',
          width: "150px",
          backgroundColor: "#686868",
          padding: "4px", 
          borderRadius: '5px'
        }}
      >
        <FormControl fullWidth variant="outlined">
          <Select
            value={displayedData}
            onChange={(e) => {setSelectedWebsite(e.target.value)
              setDisplayedData(e.target.value)
            }}
            sx={{
              color: "#FFFFFF", 
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent", 
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "686868", 
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#686868", 
              },
              ".MuiSelect-select": {
                padding: "8px", 
              },
            }}
          >
            <MenuItem value="Overview" onClick={()=>{navigate("/dashboard/overview")
            }}>
            Overview
            </MenuItem>
            {websites.map((website, index) => (
            <MenuItem value={website} key={index} onClick={()=>{navigate(`/dashboard/${website}`)}}>{website}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
};

export default TimeFrameDropdown;
