// Axios instance with base URL and credentials support
import axios from 'axios';

let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Handle common deployment copy-paste mistakes (e.g. VITE_API_BASE_URL=https://...)
apiBaseUrl = apiBaseUrl.trim().replace(/^['"]|['"]$/g, '');
if (apiBaseUrl.includes('VITE_API_BASE_URL=')) {
  apiBaseUrl = apiBaseUrl.split('VITE_API_BASE_URL=')[1];
}
apiBaseUrl = apiBaseUrl.trim().replace(/^['"]|['"]$/g, '');

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
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
