import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Heart,
  User,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchUserListings = async () => {
    setLoading(true);
    try {
      const res = await carService.getUserListings();
      if (res.data.success) {
        setMyListings(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching user listings:', error);
      toast.error('Could not load your vehicle listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await carService.deleteCar(id);
      if (res.data.success) {
        toast.success('Listing deleted successfully');
        setMyListings((prev) => prev.filter((car) => car._id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      toast.error('Could not delete listing');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8 min-h-[75vh]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="w-7 h-7 text-cyan-400" />
            <h1 className="text-3xl font-extrabold text-white">Seller Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your published vehicle listings, track performance, and post new inventory.
          </p>
        </div>

        <Link
          to="/add-car"
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-brand-600/30 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Vehicle</span>
        </Link>
      </div>

      {/* Profile & Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-bold text-white">{user?.name}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block text-[10px] bg-slate-800 text-brand-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
              Verified Seller
            </span>
          </div>
        </div>

        {/* Active Listings Counter */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Listings</span>
            <p className="text-3xl font-extrabold text-white">{myListings.length}</p>
            <span className="text-[11px] text-emerald-400 font-medium">Published on Marketplace</span>
          </div>
          <div className="p-3 bg-brand-500/10 text-brand-400 rounded-xl">
            <Car className="w-6 h-6" />
          </div>
        </div>

        {/* Wishlist Favorites Stats */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saved Wishlist</span>
            <p className="text-3xl font-extrabold text-white">{user?.wishlist?.length || 0}</p>
            <span className="text-[11px] text-rose-400 font-medium">Cars bookmarked by you</span>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
            <Heart className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* My Listings Table Section */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Car className="w-5 h-5 text-brand-400" />
          <span>My Vehicle Listings ({myListings.length})</span>
        </h2>

        {loading ? (
          <div className="py-12 text-center text-slate-400">
            <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading your published cars...
          </div>
        ) : myListings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Brand / Model</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Listed Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {myListings.map((car) => {
                  const thumb = car.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop';
                  return (
                    <tr key={car._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 flex items-center space-x-3">
                        <img src={thumb} alt={car.title} className="w-12 h-9 object-cover rounded-lg bg-slate-950 shrink-0" />
                        <Link to={`/cars/${car._id}`} className="font-bold text-white hover:text-brand-400 line-clamp-1">
                          {car.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {car.brand} • {car.model} ({car.year})
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">
                        {formatCurrency(car.price)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{car.location}</td>
                      <td className="py-3.5 px-4 text-slate-400">{formatDate(car.createdAt)}</td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          to={`/cars/${car._id}`}
                          className="inline-block p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-md"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/edit-car/${car._id}`}
                          className="inline-block p-1.5 text-cyan-400 hover:text-cyan-300 bg-slate-800 rounded-md"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(car._id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 bg-slate-800 rounded-md"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <p className="text-slate-400 text-sm">You haven't posted any vehicle listings yet.</p>
            <Link
              to="/add-car"
              className="inline-flex items-center space-x-2 bg-brand-600 text-white font-semibold text-xs px-4 py-2 rounded-xl"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Your First Listing</span>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Modal Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 rounded-2xl border border-rose-500/40 space-y-4">
            <h3 className="text-lg font-bold text-white">Delete Listing?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this listing from AutoVault?
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold py-2.5 rounded-xl"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
