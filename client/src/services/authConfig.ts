import axios from "axios";
import {backendUrl} from '../state/Atoms';
 
export const handleLogout = async () => {
  window.location.href = 'http://localhost:3000/';
  
  
    localStorage.removeItem('token');

};

export const handleSession = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${backendUrl}/api/auth/activeUser`, {
      headers: {
         Authorization: `Bearer ${token}`
      }
    });
  
    if (response.status === 200) {
      return response.data.email;
    } else {
      return "";
    }
  } catch (err) {
    localStorage.removeItem('token');
   
    return "";
  }
};
