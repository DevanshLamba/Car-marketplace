import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Lock, Mail, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setLoading(true);
    const success = await login(demoEmail, 'password123');
    setLoading(false);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-500/20 mx-auto">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to manage your listings and saved cars</p>
        </div>

        {/* 1-Click Demo Login Pill Banner for Placement Evaluation */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-brand-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Placement Demo Accounts</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoLogin('demo@carhub.com')}
              className="bg-brand-600/20 hover:bg-brand-600/40 text-brand-300 border border-brand-500/30 text-xs py-2 px-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Alex (Demo)</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('sarah@carhub.com')}
              className="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-xs py-2 px-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sarah (Demo)</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center pt-2 text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-brand-400 hover:underline">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
