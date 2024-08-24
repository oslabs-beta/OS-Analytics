export const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (response.ok) {
        return true;
      } else {
        console.error('Failed to log out');
        return false;
      }
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };