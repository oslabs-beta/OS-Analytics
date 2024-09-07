import { Box, FormControl, Select, MenuItem, IconButton, Typography, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const WebsiteSelector = ({
  websites,
  selectedWebsite,
  loading,
  onSelectWebsite,
  onDelete,
}: {
  websites: string[];
  selectedWebsite: string;
  loading: boolean;
  onSelectWebsite: (website: string) => void;
  onDelete: () => void;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
    <FormControl fullWidth variant="outlined">
      <Typography variant="h6" gutterBottom>
        Select a Website to Delete
      </Typography>
      <Select value={selectedWebsite} onChange={(e) => onSelectWebsite(e.target.value)} displayEmpty>
        <MenuItem value="">
          <em>Select a website</em>
        </MenuItem>
        {websites.map((website, index) => (
          <MenuItem key={index} value={website}>
            {website}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <IconButton color="secondary" onClick={onDelete} disabled={!selectedWebsite || loading} sx={{ ml: 2, marginTop: '35px' }}>
      {loading ? <CircularProgress size={24} /> : <DeleteIcon />}
    </IconButton>
  </Box>
);
