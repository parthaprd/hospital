import axios from 'axios';

// NEXT_PUBLIC_API_URL must be set in .env.local (dev) or Vercel env vars (prod).
// Falls back to localhost only in local development when the var is missing.
const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL && typeof window === 'undefined') {
  // Server-side build warning — won't crash the build but flags the misconfiguration.
  console.warn('[axios] NEXT_PUBLIC_API_URL is not set. API calls will fail in production.');
}

const axiosInstance = axios.create({
  baseURL: baseURL ?? 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
