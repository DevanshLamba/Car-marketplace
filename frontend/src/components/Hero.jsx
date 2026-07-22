import React, { useState } from 'react';
import { Search, Sparkles, Shield, Zap, SlidersHorizontal } from 'lucide-react';

const Hero = ({ onSearch, onSelectBrand, currentBrand }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const topBrands = ['All', 'BMW', 'Porsche', 'Audi', 'Mercedes-Benz', 'Tesla', 'Toyota', 'Ford'];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-dark-900 to-dark-900 pt-8 pb-12 border-b border-slate-800/60">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Auto Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Dream Drive with <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Zero Compromise</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto">
            Discover verified luxury vehicles, sports coupes, and dependable pre-owned cars from trusted individual sellers nationwide.
          </p>

          {/* Quick Search Box */}
          <form onSubmit={handleSearchSubmit} className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-2xl rounded-2xl glass-panel p-2 border border-slate-700/60">
              <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by brand, model (e.g. M4, 911, Mustang)..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-4 py-3 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all shrink-0 flex items-center space-x-2"
              >
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Brand Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-2 flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1" /> Top Brands:
            </span>
            {topBrands.map((b) => (
              <button
                key={b}
                onClick={() => onSelectBrand(b)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  (currentBrand === b || (!currentBrand && b === 'All'))
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-2 ring-brand-400/50'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

        </div>

        {/* Feature Badges Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6 border-t border-slate-800/50">
          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-brand-500/10 text-brand-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verified Records</h4>
              <p className="text-xs text-slate-400">Clear titles & vehicle specs</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Seller Contact</h4>
              <p className="text-xs text-slate-400">Zero middleman commission</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instant Wishlist</h4>
              <p className="text-xs text-slate-400">Save & compare listings</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
