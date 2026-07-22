import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, formatKm } from '../utils/formatters';
import { Heart, MapPin, Fuel, Gauge, Calendar, Images, ArrowRight, User } from 'lucide-react';

const CarCard = ({ car }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(car._id);

  const mainImage = (car.images && car.images.length > 0)
    ? car.images[0]
    : 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1.5 border border-slate-800/80">
      
      {/* Image Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={mainImage}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => toggleWishlist(car._id, e)}
          className={`absolute top-3 right-3 p-2.5 rounded-full glass-panel transition-transform duration-200 active:scale-90 ${
            saved
              ? 'bg-rose-500/20 text-rose-500 border-rose-500/50'
              : 'text-white/80 hover:text-white hover:bg-slate-900/80'
          }`}
          title={saved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Multiple Images Count Badge */}
        {car.images && car.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2.5 py-1 rounded-md bg-dark-950/80 backdrop-blur-md text-[11px] font-semibold text-slate-200 border border-white/10">
            <Images className="w-3.5 h-3.5 text-brand-400" />
            <span>{car.images.length} Photos</span>
          </div>
        )}

        {/* Brand Tag */}
        <div className="absolute top-3 left-3 bg-brand-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
          {car.brand}
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Title */}
          <Link to={`/cars/${car._id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-1">
              {car.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {formatCurrency(car.price)}
            </span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
          <div className="flex items-center space-x-1.5 bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
            <Calendar className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="truncate">{car.year} Model</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
            <Gauge className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{formatKm(car.kmDriven)}</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
            <Fuel className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Footer Seller & View Details */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[110px]">
              {car.sellerId?.name || 'Verified Seller'}
            </span>
          </div>

          <Link
            to={`/cars/${car._id}`}
            className="flex items-center space-x-1 text-xs font-bold text-brand-400 hover:text-brand-300 group-hover:translate-x-1 transition-all"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default CarCard;
