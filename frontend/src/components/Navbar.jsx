import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Car, Heart, PlusCircle, User, LogOut, Menu, X, LayoutDashboard, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { wishlistIds } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-dark-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-500 bg-clip-text text-transparent">
                AUTO<span className="text-brand-500">VAULT</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                Premier Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/')
                  ? 'bg-slate-800 text-brand-400 font-semibold border border-brand-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Browse Cars
            </Link>

            {user && (
              <Link
                to="/wishlist"
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  isActive('/wishlist')
                    ? 'bg-slate-800 text-brand-400 font-semibold border border-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                <span>Wishlist</span>
                {wishlistIds.length > 0 && (
                  <span className="ml-1.5 bg-rose-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>
            )}

            {user && (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  isActive('/dashboard')
                    ? 'bg-slate-800 text-brand-400 font-semibold border border-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/add-car"
                  className="flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-brand-600/30 hover:shadow-brand-500/50 transition-all duration-200"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Sell Your Car</span>
                </Link>

                <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-white leading-tight">{user.name}</span>
                    <span className="text-[11px] text-slate-400 leading-tight">{user.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    title="Logout"
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-brand-600/20 transition-all"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Browse Cars
          </Link>

          {user ? (
            <>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                <span className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Wishlist</span>
                </span>
                <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {wishlistIds.length}
                </span>
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/add-car"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 bg-brand-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Sell Your Car</span>
              </Link>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-3">
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 text-rose-400 text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-brand-600 text-white py-2.5 rounded-xl font-semibold text-sm"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
