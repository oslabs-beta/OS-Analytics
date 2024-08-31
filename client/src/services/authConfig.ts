import axios from "axios";
import {backendUrl} from '../state/Atoms';
 
export const handleLogout = async () => {
      localStorage.removeItem('token');
      return true;
};

export const handleSession = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${backendUrl}/api/auth/activeUser`, {
      headers: {
         Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    if (response.status === 200) {
      return response.data.email;
    } else {
      return "";
    }
  } catch (err) {
    console.log("hit");
    return "";
  }
};
