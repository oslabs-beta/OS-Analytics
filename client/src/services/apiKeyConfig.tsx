import axios from 'axios';
import {backendUrl} from '../state/Atoms';

export const fetchApiKey = async (token: string) => {
  try {
    const response = await axios.get(`${backendUrl}/api/auth/getApiKey`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.apiKey;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
};

export const handleDeleteApiKey = async (token: string) => {

    try {
      const response = await axios.delete(`${backendUrl}/api/auth/apiKey`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.status === 200
  
      } else {
        console.error("Failed to delete API key");
      }
    } catch (error) {
      console.error("Error deleting API key: ", error);
    }
  };
  
  export const handleRegenerateApiKey = async (token: string) => {
    try {
      const response = await axios.put(`${backendUrl}/api/auth/apiKey`, {}, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const {apiKey}  = response.data;

      return apiKey;
    } else {
      console.error("Failed to regenerate API key");
    }
  } catch (error) {
    console.error("Error regenerating API key: ", error);
  }
};
