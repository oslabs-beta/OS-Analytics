import axios from "axios";
 
export const handleLogout = async () => {
      localStorage.removeItem('token');
      return true;
};

export const handleSession = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get("http://ec2-13-52-215-70.us-west-1.compute.amazonaws.com:8080/api/auth/activeUser", {
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
