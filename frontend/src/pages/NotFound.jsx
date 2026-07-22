import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="glass-panel p-12 rounded-3xl max-w-md w-full border border-slate-800 space-y-4">
        <div className="w-16 h-16 bg-slate-800 text-brand-400 rounded-2xl flex items-center justify-center mx-auto">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The vehicle listing or page you were trying to access does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Marketplace</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
