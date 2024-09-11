import { useState, useEffect } from "react";
import { fetchApiKey, handleDeleteApiKey, handleRegenerateApiKey } from "../../services/apiKeyConfig";

export const useApiKey = (token: string) => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const key = await fetchApiKey(token);
        setApiKey(key);
      } catch (error) {
        console.error("Failed to fetch API key:", error);
      }
    };
    getApiKey();
  }, [token]);

  const deleteApiKey = async () => {
    try {
      const response = await handleDeleteApiKey(token);
      if (response) {
        setApiKey("");
      }
    } catch (error) {
      console.error("Error deleting API key: ", error);
    }
  };

  const regenerateApiKey = async () => {
    try {
      const response = await handleRegenerateApiKey(token);
      if (response) {
        console.log("hit")
        setApiKey(response);
        return response;
      }
    } catch (error) {
      console.error("Error regenerating API key: ", error);
    }
  };

  return { apiKey, setApiKey, deleteApiKey, regenerateApiKey };
};
