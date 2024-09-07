import { useAtom } from 'jotai';
import { Select, MenuItem, FormControl } from '@mui/material';
import { activeWebsiteAtom, websitesAtom } from '../../state/Atoms';

const SelectWebsiteDropDown = () => {
  const [selectedWebsite, setSelectedWebsite] = useAtom(activeWebsiteAtom);
  const [websites] = useAtom(websitesAtom);

  return (
    <div>
      <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: '20px', height: '30px' }}>
        <Select
          value={selectedWebsite}
          onChange={(e) => setSelectedWebsite(e.target.value)}
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
        <MenuItem value="All Websites">All Websites</MenuItem>
          {websites.map((website, index) => (
            <MenuItem key={index} value={website}>
              {website}
            </MenuItem>
            
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectWebsiteDropDown;
