import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Zap, Award, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center shadow-md">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AUTO<span className="text-brand-500">VAULT</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier marketplace for verified luxury, performance, and pre-owned automobiles. Seamless buyer-seller connections with absolute transparency.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Sellers & Listings</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Browse Inventory</Link></li>
              <li><Link to="/wishlist" className="hover:text-brand-400 transition-colors">Saved Wishlist</Link></li>
              <li><Link to="/add-car" className="hover:text-brand-400 transition-colors">Post Vehicle Listing</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-400 transition-colors">Seller Dashboard</Link></li>
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Top Brands</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/?brand=BMW" className="hover:text-brand-400 transition-colors">BMW Performance</Link></li>
              <li><Link to="/?brand=Porsche" className="hover:text-brand-400 transition-colors">Porsche Sports</Link></li>
              <li><Link to="/?brand=Audi" className="hover:text-brand-400 transition-colors">Audi RS Series</Link></li>
              <li><Link to="/?brand=Mercedes-Benz" className="hover:text-brand-400 transition-colors">Mercedes-AMG</Link></li>
              <li><Link to="/?brand=Tesla" className="hover:text-brand-400 transition-colors">Tesla Electric</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Full-Stack Tech</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">MongoDB</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Express.js</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">React.js</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Node.js</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Tailwind CSS</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">JWT Auth</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-2">
              Built for placement evaluation with production architecture & modular design.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AutoVault Car Marketplace. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using the MERN Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
