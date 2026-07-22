import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session on initial render
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('autovault_token');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.data.success) {
            setUser(res.data.data);
          }
        } catch (error) {
          console.error('Session expired or invalid token');
          localStorage.removeItem('autovault_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      if (res.data.success) {
        const { token, ...userData } = res.data.data;
        localStorage.setItem('autovault_token', token);
        setUser(userData);
        toast.success(`Welcome back, ${userData.name}!`);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(msg);
      return false;
    }
  };

  // Register handler
  const register = async (name, email, password) => {
    try {
      const res = await authService.register({ name, email, password });
      if (res.data.success) {
        const { token, ...userData } = res.data.data;
        localStorage.setItem('autovault_token', token);
        setUser(userData);
        toast.success('Account created successfully!');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      return false;
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('autovault_token');
    setUser(null);
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
