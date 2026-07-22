import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wishlistService } from '../services/api';
import CarCard from '../components/CarCard';
import { CarGridSkeleton } from '../components/LoadingSkeleton';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [wishlistCars, setWishlistCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await wishlistService.getWishlist();
      if (res.data.success) {
        setWishlistCars(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Could not load saved wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8 min-h-[70vh]">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <h1 className="text-3xl font-extrabold text-white">Your Saved Wishlist</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Keep track of performance cars, compare specs, and contact sellers when you're ready to buy.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 text-xs text-brand-400 font-semibold bg-brand-500/10 px-3.5 py-2 rounded-xl border border-brand-500/20">
          {wishlistCars.length} Saved Vehicle(s)
        </div>
      </div>

      {/* Grid or Empty state */}
      {loading ? (
        <CarGridSkeleton count={3} />
      ) : wishlistCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-16 rounded-3xl text-center border border-slate-800 space-y-5 my-10 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Wishlist is Currently Empty</h3>
          <p className="text-sm text-slate-400">
            Explore our curated inventory of certified performance coupes, electric cars, and SUVs and tap the heart icon to save them.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            <span>Browse Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

    </div>
  );
};

export default Wishlist;
