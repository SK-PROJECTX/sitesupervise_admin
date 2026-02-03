export const setAuthTokens = (accessToken: string, refreshToken: string, user: any) => {
  // Store in localStorage for API calls
  localStorage.setItem("admin_access_token", accessToken);
  localStorage.setItem("admin_refresh_token", refreshToken);
  localStorage.setItem("admin_user", JSON.stringify(user));
};

export const clearAuthTokens = () => {
  // Clear localStorage
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_user");
};

export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem("admin_user");
  return userStr ? JSON.parse(userStr) : null;
};

export const getStoredTokens = () => {
  if (typeof window === 'undefined') return { accessToken: null, refreshToken: null };
  
  return {
    accessToken: localStorage.getItem('admin_access_token'),
    refreshToken: localStorage.getItem('admin_refresh_token')
  };
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem("admin_access_token");
  const user = getStoredUser();
  
  return !!(token && user && user.role === 'ADMIN');
};

export const logout = async () => {
  try {
    const { refreshToken } = getStoredTokens();
    
    // Call logout API if refresh token exists
    if (refreshToken) {
      await fetch('https://sitesupervise-backend-tkyx.onrender.com/api/v1/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_access_token')}`
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      });
    }
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Always clear tokens regardless of API call success
    clearAuthTokens();
    window.location.href = '/login';
  }
};