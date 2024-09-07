import axios from "axios";
import { backendUrl } from "../state/Atoms";

export const deleteWebsite = async (selectedWebsite: string, token: string) => {
  try {
    const response = await axios.delete(`${backendUrl}/api/data/delete-website`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { website_name: selectedWebsite },
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error deleting website:", error);
    throw error;
  }
};
export const deleteAccount = async (token: string) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/auth/delete-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.status === 200;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  };