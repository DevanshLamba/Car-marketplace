import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { wishlistService } from '../services/api';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync user wishlist IDs on login or profile change
  useEffect(() => {
    if (user && user.wishlist) {
      const ids = Array.isArray(user.wishlist)
        ? user.wishlist.map((item) => (typeof item === 'object' ? item._id : item))
        : [];
      setWishlistIds(ids);
    } else if (!user) {
      setWishlistIds([]);
    }
  }, [user]);

  const isWishlisted = (carId) => {
    if (!carId) return false;
    return wishlistIds.includes(carId);
  };

  const toggleWishlist = async (carId, e) => {
    if (e) e.stopPropagation();

    if (!user) {
      toast.error('Please log in to save cars to your wishlist');
      return false;
    }

    try {
      const isCurrentlySaved = wishlistIds.includes(carId);
      
      // Optimistic state update
      if (isCurrentlySaved) {
        setWishlistIds((prev) => prev.filter((id) => id !== carId));
      } else {
        setWishlistIds((prev) => [...prev, carId]);
      }

      const res = await wishlistService.toggleWishlist(carId);
      if (res.data.success) {
        if (res.data.isWishlisted) {
          toast.success('Saved to Wishlist ⭐');
        } else {
          toast.success('Removed from Wishlist');
        }
        return true;
      }
    } catch (error) {
      // Revert on error
      toast.error('Could not update wishlist.');
      return false;
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, isWishlisted, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
