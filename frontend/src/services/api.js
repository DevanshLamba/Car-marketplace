import axios from 'axios';

/**
 * API base URL:
 *  - In development, Vite proxies /api → http://localhost:5000 (vite.config.js)
 *  - In production (Vercel), VITE_API_URL must be set to your Render backend URL
 *    e.g.  VITE_API_URL=https://your-app.onrender.com/api
 */
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const API = axios.create({ baseURL: BASE_URL });

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('autovault_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authService = {
  login:    (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe:    ()     => API.get('/auth/me')
};

// Cars
export const carService = {
  getCars:        (params) => API.get('/cars', { params }),
  getCarById:     (id)     => API.get(`/cars/${id}`),
  createCar:      (data)   => API.post('/cars', data),
  updateCar:      (id, data) => API.put(`/cars/${id}`, data),
  deleteCar:      (id)     => API.delete(`/cars/${id}`),
  getUserListings: ()      => API.get('/cars/user/listings')
};

// Wishlist
export const wishlistService = {
  getWishlist:       ()      => API.get('/wishlist'),
  toggleWishlist:    (carId) => API.post(`/wishlist/${carId}`),
  removeFromWishlist:(carId) => API.delete(`/wishlist/${carId}`)
};

// Upload
export const uploadService = {
  uploadImages: (formData) =>
    API.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};

export default API;
