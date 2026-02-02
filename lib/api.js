import axios from "axios";

const api = axios.create({
  baseURL: "https://sitesupervise-backend-tkyx.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_access_token");
  console.log('🔑 Admin API Request:', config.method?.toUpperCase(), config.url);
  console.log('🔑 Admin Token exists:', !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Admin API Response:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.error('❌ Admin API Error:', error.response?.status, error.config?.url, error.message);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("admin_refresh_token");
      if (refresh) {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/auth/refresh/",
            {
              refresh: refresh,
            }
          );
          localStorage.setItem("admin_access_token", res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem("admin_access_token");
          localStorage.removeItem("admin_refresh_token");
          console.log(err);
          // Redirect to admin login
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;