import { useAtom } from 'jotai';
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import styles from '../User/UserView.module.css';
import { timeFrameAtom } from '../../state/Atoms';

const TimeFrameDropdown = () => {
    const [timeFrame, setTimeFrame] = useAtom(timeFrameAtom);

    return  (
      <Box
        className={styles.timeframe}
        sx={{
          position: 'absolute',
          top: '10px', 
          right: '10px', 
          marginLeft:'10px',
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          width: "250px",
          backgroundColor: "#686868",
          padding: "4px", 
          borderRadius: '5px'
        }}
      >
        <FormControl fullWidth variant="outlined">
          <Select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
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
            <MenuItem value="1 day">Last 24 Hours</MenuItem>
            <MenuItem value="1 week">Last Week</MenuItem>
            <MenuItem value="1 month">This Month</MenuItem>
            <MenuItem value="1 year">1 Year</MenuItem>
            <MenuItem value="5 years">5 Years</MenuItem>
            <MenuItem value="allTime">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
};

export default TimeFrameDropdown;
