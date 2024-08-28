import axios from "axios";
export const handleLogout = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
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
    const response = await axios.get("/api/auth/activeUser");
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
