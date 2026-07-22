import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// Interceptor to attach Authorization Token if present in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('autovault_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth Services
export const authService = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getMe: () => API.get('/auth/me')
};

// Car Services
export const carService = {
  getCars: (params) => API.get('/cars', { params }),
  getCarById: (id) => API.get(`/cars/${id}`),
  createCar: (carData) => API.post('/cars', carData),
  updateCar: (id, carData) => API.put(`/cars/${id}`, carData),
  deleteCar: (id) => API.delete(`/cars/${id}`),
  getUserListings: () => API.get('/cars/user/listings')
};

// Wishlist Services
export const wishlistService = {
  getWishlist: () => API.get('/wishlist'),
  toggleWishlist: (carId) => API.post(`/wishlist/${carId}`),
  removeFromWishlist: (carId) => API.delete(`/wishlist/${carId}`)
};

// Upload Service
export const uploadService = {
  uploadImages: (formData) => API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

export default API;
