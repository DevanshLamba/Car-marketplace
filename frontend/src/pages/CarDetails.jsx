import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, formatKm, formatDate } from '../utils/formatters';
import {
  Heart,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Edit,
  Trash2,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const res = await carService.getCarById(id);
        if (res.data.success) {
          setCar(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        toast.error('Listing not found or server error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const res = await carService.deleteCar(id);
      if (res.data.success) {
        toast.success('Listing deleted successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Could not delete listing');
    }
  };

  const isOwner = user && car && (
    (typeof car.sellerId === 'object' ? car.sellerId._id : car.sellerId) === user._id
  );

  const saved = car ? isWishlisted(car._id) : false;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400">Loading car specifications...</p>
      </div>
    );
  }

  if (!car) return null;

  const images = car.images && car.images.length > 0
    ? car.images
    : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-white font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        {isOwner && (
          <div className="flex items-center space-x-3">
            <Link
              to={`/edit-car/${car._id}`}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
              <span>Edit Listing</span>
            </Link>
            
            <button
              onClick={() => setDeleteConfirm(true)}
              className="inline-flex items-center space-x-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl text-xs font-semibold border border-rose-500/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Listing</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Gallery Left, Pricing & Specs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Display Image */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-slate-800 bg-black">
            <img
              src={images[activeImageIndex]}
              alt={car.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 bg-brand-600/90 text-white text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
              {car.brand}
            </div>

            <button
              onClick={(e) => toggleWishlist(car._id, e)}
              className={`absolute top-4 right-4 p-3 rounded-full glass-panel active:scale-95 transition-all ${
                saved ? 'bg-rose-500/20 text-rose-500 border-rose-500' : 'text-white/80 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Selector */}
          {images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === index ? 'border-brand-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Section */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-white">Vehicle Overview & Highlights</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {car.description}
            </p>
          </div>

        </div>

        {/* Right Column: Pricing, Specs Grid, Seller Contact */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            
            {/* Title & Price */}
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                {car.brand} • {car.model}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug">
                {car.title}
              </h1>
              
              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {formatCurrency(car.price)}
                </span>
                <span className="text-xs text-slate-400 font-medium">Negotiable Price</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Calendar className="w-4 h-4 text-brand-400" />
                  <span>Year</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{car.year}</p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <span>Kilometers</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{formatKm(car.kmDriven)}</p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Fuel className="w-4 h-4 text-amber-400" />
                  <span>Fuel Type</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{car.fuelType}</p>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Gauge className="w-4 h-4 text-purple-400" />
                  <span>Transmission</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{car.transmission}</p>
              </div>
            </div>

            {/* Location & Listed Date */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Location: <strong>{car.location}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Listed Date: {formatDate(car.createdAt)}</span>
              </div>
            </div>

            {/* Contact Seller Action Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Verified Seller</span>
              </button>
            </div>

          </div>

          {/* Seller Profile Summary Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold text-lg">
              {car.sellerId?.name ? car.sellerId.name.charAt(0) : 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1.5">
                <h4 className="text-sm font-bold text-white">{car.sellerId?.name || 'Seller'}</h4>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400">Member on AutoVault Marketplace</p>
            </div>
          </div>

        </div>

      </div>

      {/* Seller Contact Modal Popup */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 rounded-2xl border border-slate-700 space-y-5 animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Contact Seller</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <User className="w-5 h-5 text-brand-400" />
                <div>
                  <p className="text-xs text-slate-400">Seller Name</p>
                  <p className="text-sm font-semibold text-white">{car.sellerId?.name || 'Private Seller'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="text-sm font-semibold text-white">{car.sellerId?.email || 'seller@autovault.com'}</p>
                </div>
              </div>

              <div className="bg-brand-500/10 border border-brand-500/30 p-3 rounded-xl text-xs text-brand-300">
                💡 Tip: Mention that you found this listing on AutoVault when calling or emailing!
              </div>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-2.5 rounded-xl"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 rounded-2xl border border-rose-500/40 space-y-4">
            <h3 className="text-lg font-bold text-white">Delete Listing?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete <strong>{car.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CarDetails;
