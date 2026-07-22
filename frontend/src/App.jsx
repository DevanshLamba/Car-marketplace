import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import AddEditCar from './pages/AddEditCar';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-dark-900 text-slate-100">
            
            {/* Global Navbar */}
            <Navbar />

            {/* Main Application Body */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes requiring Authentication */}
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-car"
                  element={
                    <ProtectedRoute>
                      <AddEditCar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-car/:id"
                  element={
                    <ProtectedRoute>
                      <AddEditCar />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Catch All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Toast Notification Container */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '13px',
                  borderRadius: '12px'
                }
              }}
            />

          </div>
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
