// Axios instance with base URL and credentials support
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,           // send cookies with every request
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor ────────────────────────────────────
// (e.g. attach auth token from localStorage when auth is implemented)
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: const token = localStorage.getItem('token');
    // TODO: if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ───────────────────────────────────
// Centralise error handling / token refresh logic here later
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle 401 → redirect to login
    return Promise.reject(error);
  }
);

export default axiosInstance;
