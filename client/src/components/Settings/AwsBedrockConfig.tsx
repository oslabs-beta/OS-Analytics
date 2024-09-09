import { Box, Typography, Button, TextField, CircularProgress, Alert, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const AwsBedrockConfig = () => {
  const [awsClientKey, setAwsClientKey] = useState("");
  const [awsSecretKey, setAwsSecretKey] = useState("");
  const [awsRegion, setAwsRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setAlertMessage(null);
    if (!awsClientKey || !awsSecretKey || !awsRegion) {
      setAlertType("error");
      setAlertMessage("AWS Client Key, Secret Key, and Region are all required.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "/api/auth/awsCredentials",
        {
          awsClientKey,
          awsSecretKey,
          awsRegion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAwsClientKey("");
      setAwsSecretKey("");
      setAwsRegion("");
      setAlertType("success");
      setAlertMessage("AWS Credentials saved successfully!");
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Error saving credentials. Please try again.");
      console.error("Error saving credentials:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ width: "100%", maxWidth: "400px", margin: "0 auto", marginTop: "30px" }}>
        <Typography variant="h4" gutterBottom align="center">
          AWS Credentials
        </Typography>

        {alertMessage && (
          <Alert severity={alertType!} sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="AWS Client Key" 
            variant="outlined"
            type="password"
            value={awsClientKey}
            onChange={(e) => setAwsClientKey(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="AWS Secret Key" 
            type="password"
            value={awsSecretKey}
            onChange={(e) => setAwsSecretKey(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>AWS Region</InputLabel>
            <Select
              value={awsRegion}
              onChange={(e) => setAwsRegion(e.target.value as string)}
              label="AWS Region"
            >
              <MenuItem value="us-east-1">US East 1 (N. Virginia)</MenuItem>
              <MenuItem value="us-west-2">US West 2 (Oregon)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save Credentials"}
        </Button>
      </Box>
    </Box>
  );
};

export default AwsBedrockConfig;
