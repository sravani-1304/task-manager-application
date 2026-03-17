import axios from 'axios';
import toast from 'react-hot-toast';

// Use explicit localhost URL
const API_URL = 'https://task-manager-application-gxhn.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    console.log('Making request to:', config.baseURL + config.url); // Debug log
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });

    if (error.code === 'ERR_NETWORK') {
      toast.error('Cannot connect to server. Please make sure backend is running on port 5000');
    } else if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 400) {
      toast.error(error.response.data.message || 'Invalid request');
    } else {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    
    return Promise.reject(error);
  }
);

export default api;