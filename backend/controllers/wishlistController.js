const User = require('../models/User');
const Car = require('../models/Car');
const { isMongoConnected } = require('../config/db');
const {
  toggleWishlistStore,
  getUserWishlistCarsStore
} = require('../utils/inMemoryStore');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const user = await User.findById(req.user._id).populate({
        path: 'wishlist',
        populate: { path: 'sellerId', select: 'name email' }
      });
      if (user) {
        return res.json({
          success: true,
          count: user.wishlist.length,
          data: user.wishlist
        });
      }
    }

    // In-Memory store fallback
    const cars = getUserWishlistCarsStore(req.user._id);
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle or add car to wishlist
// @route   POST /api/wishlist/:id
// @access  Private
const toggleWishlist = async (req, res, next) => {
  try {
    const carId = req.params.id;

    if (isMongoConnected()) {
      const car = await Car.findById(carId);
      if (car) {
        const user = await User.findById(req.user._id);
        const isSaved = user.wishlist.includes(carId);

        if (isSaved) {
          user.wishlist = user.wishlist.filter((id) => id.toString() !== carId.toString());
          await user.save();
          return res.json({
            success: true,
            isWishlisted: false,
            message: 'Removed from saved wishlist',
            data: user.wishlist
          });
        } else {
          user.wishlist.push(carId);
          await user.save();
          return res.json({
            success: true,
            isWishlisted: true,
            message: 'Added to saved wishlist',
            data: user.wishlist
          });
        }
      }
    }

    // In-Memory store fallback
    const result = toggleWishlistStore(req.user._id, carId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Car listing not found' });
    }

    res.json({
      success: true,
      isWishlisted: result.isWishlisted,
      message: result.isWishlisted ? 'Added to saved wishlist' : 'Removed from saved wishlist',
      data: result.wishlist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove car from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res, next) => {
  try {
    const carId = req.params.id;

    if (isMongoConnected()) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.wishlist = user.wishlist.filter((id) => id.toString() !== carId.toString());
        await user.save();
        return res.json({
          success: true,
          message: 'Removed from wishlist',
          data: user.wishlist
        });
      }
    }

    // In-Memory store fallback
    const result = toggleWishlistStore(req.user._id, carId);
    res.json({
      success: true,
      message: 'Removed from wishlist',
      data: result ? result.wishlist : []
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  removeFromWishlist
};
