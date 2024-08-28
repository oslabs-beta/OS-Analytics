import { useAtom } from 'jotai';
import { Select, MenuItem, FormControl } from '@mui/material';
import { timeFrameAtom } from '../../state/Atoms';

const TimeFrameDropdown = () => {
    const [timeFrame, setTimeFrame] = useAtom(timeFrameAtom);
  
    return (
      <div style={{ position: 'sticky', top: '90px' }}>
        <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: '20px', height: '30px' }}>
          <Select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            style={{
              backgroundColor: 'rgba(50, 50, 50, 0.8)',
              color: 'white',
              borderRadius: '4px',
              height: '30px',
              padding: '5px 10px',
              boxShadow: 'none',
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: 'rgba(50, 50, 50, 0.8)',
                  color: 'white',
                },
              },
            }}
          >
            <MenuItem value="24hours">Last 24 Hours</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };
  
  export default TimeFrameDropdown;