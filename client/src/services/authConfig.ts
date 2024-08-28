import axios from "axios";
export const handleLogout = async () => {
  try {
    const response = await fetch("http://ec2-13-52-215-70.us-west-1.compute.amazonaws.com:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to log out");
      return false;
    }
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

export const handleSession = async () => {
  try {
    const response = await axios.get("http://ec2-13-52-215-70.us-west-1.compute.amazonaws.com:8080/api/auth/activeUser");
    console.log(response);
    if (response.status === 200) {
      return (response.data.email);
    } else {
     return("");
    }
  } catch (err) {
    console.log("hit");
  }
};
