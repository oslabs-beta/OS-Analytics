import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import ApiKeyDisplay from "./ApiKeyFormat";

export const ApiKeySection = ({
  apiKey,
  onDelete,
  onRegenerate,
}: {
  apiKey: string;
  onDelete: () => void;
  onRegenerate: () => void;
}) => (
  <Box mb={4}>
    <Typography variant="h6">Secret API key:</Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ApiKeyDisplay data={apiKey} />
      <IconButton color="primary" onClick={onRegenerate} sx={{ ml: 2 }}>
        <RefreshIcon />
      </IconButton>
      <IconButton color="error" onClick={onDelete} sx={{ ml: 1 }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
);
