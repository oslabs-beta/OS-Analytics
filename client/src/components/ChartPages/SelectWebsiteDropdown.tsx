import { useAtom } from 'jotai';
import { Select, MenuItem, FormControl, SelectChangeEvent} from '@mui/material';
import { activeWebsiteAtom, websitesAtom } from '../../state/Atoms';
import { useNavigate } from 'react-router-dom';

const SelectWebsiteDropDown = () => {
  const [selectedWebsite, setSelectedWebsite] = useAtom(activeWebsiteAtom);
  const [websites] = useAtom(websitesAtom);
  const navigate = useNavigate(); 

  const handleWebsiteChange = (event: SelectChangeEvent<string>) => {
    const newWebsite = event.target.value;
    setSelectedWebsite(newWebsite); 
    navigate(newWebsite === 'overview' ? '/dashboard/overview' : `/dashboard/${newWebsite}`);
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        style={{ minWidth: 120, marginBottom: '20px', height: '30px' }}
      >
        <Select
          value={selectedWebsite || "overview"} 
          onChange={handleWebsiteChange} 
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
          <MenuItem value="overview">Overview</MenuItem>
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
