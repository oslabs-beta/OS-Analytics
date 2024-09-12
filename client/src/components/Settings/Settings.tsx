import { useState } from "react";
import { useAtom } from "jotai";
import { Box, Typography, Button, Paper, TextField, Tabs, Tab } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useApiKey } from "./UseApiKey";
import { ApiKeyDialog } from "./Dialogs";
import { ApiKeySection } from "./ApiKeyDisplay";
import { WebsiteSelector } from "./WebsiteSelection";
import { deleteWebsite, deleteAccount } from "../../services/deleteDataApi";
import { activeUserAtom, websitesAtom } from "../../state/Atoms";
import AwsBedrockConfig from "./AwsBedrockConfig"

const SettingsPage = () => {
  const [activeUser] = useAtom(activeUserAtom);
  const [websites, setWebsites] = useAtom(websitesAtom);
  const [selectedWebsite, setSelectedWebsite] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [openWebsiteDialog, setOpenWebsiteDialog] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [openApiKeyDeleteDialog, setOpenApiKeyDeleteDialog] = useState(false);
  const [openApiKeyRegenerateDialog, setOpenApiKeyRegenerateDialog] =
    useState(false);
  const [tabValue, setTabValue] = useState(0);

  const token = localStorage.getItem("token")!;
  const { apiKey, setApiKey, deleteApiKey, regenerateApiKey } = useApiKey(token);

  const handleDeleteWebsite = async () => {
    if (!selectedWebsite) return;
    setLoading(true);
    try {
      const isDeleted = await deleteWebsite(selectedWebsite, token);
      if (isDeleted) {
        setWebsites((prevWebsites) =>
          prevWebsites.filter((website) => website !== selectedWebsite)
        );
        setSelectedWebsite("");
      }
    } finally {
      setLoading(false);
      setOpenWebsiteDialog(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const isDeleted = await deleteAccount(token);
      if (isDeleted) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
      setOpenAccountDialog(false);
    }
  };

  const handleDeleteApiKey = async () => {
    await deleteApiKey();
    setOpenApiKeyDeleteDialog(false);
  };

  const handleRegenerateApiKey = async () => {
    setOpenApiKeyRegenerateDialog(false);
    const newApiKey = await regenerateApiKey();
    if (newApiKey) {
      setApiKey(newApiKey);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Navbar />
      <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <Paper
          sx={{
            padding: "2rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Settings
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="General Settings" />
            <Tab label="AWS Configuration" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Email</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={activeUser}
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#333333",
                    },
                  }}
                />
              </Box>

              <ApiKeySection
                apiKey={apiKey}
                onDelete={() => setOpenApiKeyDeleteDialog(true)}
                onRegenerate={() => setOpenApiKeyRegenerateDialog(true)}
              />

              <WebsiteSelector
                websites={websites}
                selectedWebsite={selectedWebsite}
                loading={loading}
                onSelectWebsite={setSelectedWebsite}
                onDelete={() => setOpenWebsiteDialog(true)}
              />

              <Typography variant="h6" sx={{ color: "#d32f2f" }}>
                D A N G E R
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenAccountDialog(true)}
                disabled={loading}
                fullWidth
              >
                Delete Account
              </Button>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <AwsBedrockConfig />
            </Box>
          )}

          <ApiKeyDialog
            open={openApiKeyDeleteDialog}
            onClose={() => setOpenApiKeyDeleteDialog(false)}
            onConfirm={handleDeleteApiKey}
            title="Confirm Delete API Key"
            description="Are you sure you want to delete your API key?"
          />

          <ApiKeyDialog
            open={openApiKeyRegenerateDialog}
            onClose={() => setOpenApiKeyRegenerateDialog(false)}
            onConfirm={handleRegenerateApiKey}
            title="Confirm Regenerate API Key"
            description="Are you sure you want to regenerate your API key?"
          />

          <ApiKeyDialog
            open={openWebsiteDialog}
            onClose={() => setOpenWebsiteDialog(false)}
            onConfirm={handleDeleteWebsite}
            title="Confirm Delete Website"
            description={`Are you sure you want to delete the website "${selectedWebsite}"?`}
          />

          <ApiKeyDialog
            open={openAccountDialog}
            onClose={() => setOpenAccountDialog(false)}
            onConfirm={handleDeleteAccount}
            title="Confirm Delete Account"
            description="Are you sure you want to delete your account? This action cannot be undone."
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SettingsPage;
