import axios from 'axios';

// Prefer env override, fallback by NODE_ENV
const baseURL = process.env.REACT_APP_API_BASE_URL || (
    process.env.NODE_ENV === 'production'
        ? 'https://ecommerce-website-ck20.onrender.com'
        : 'http://localhost:5000'
);

// Create axios instance with base URL
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
