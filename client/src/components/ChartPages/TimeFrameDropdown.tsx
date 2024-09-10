import { useAtom } from 'jotai';
import { Box, FormControl, Select, MenuItem} from "@mui/material";
import styles from '../User/UserView.module.css'
import { timeFrameAtom } from '../../state/Atoms';

const TimeFrameDropdown = () => {
    const [timeFrame, setTimeFrame] = useAtom(timeFrameAtom);
  
    return (
      <Box className={styles.timeframe} sx={{display: "flex", alignItems: "center", mb: 4 }}>
        <FormControl fullWidth variant="outlined">
          <Select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <MenuItem value="1 day">Last 24 Hours</MenuItem>
            <MenuItem value="1 week">Last Week</MenuItem>
            <MenuItem value="1 month">This Month</MenuItem>
            <MenuItem value="1 year">1 year</MenuItem>
            <MenuItem value="5 years">5 years</MenuItem>
            <MenuItem value="allTime">All time</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
};

export default TimeFrameDropdown;