const User = require('../models/User');
const Car = require('../models/Car');

// @desc    Get the logged-in user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      populate: { path: 'sellerId', select: 'name email' }
    });

    res.json({ success: true, count: user.wishlist.length, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle a car in the wishlist (add or remove)
// @route   POST /api/wishlist/:id
// @access  Private
const toggleWishlist = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car listing not found.' });
    }

    const user = await User.findById(req.user._id);
    const isSaved = user.wishlist.some(id => id.toString() === carId);

    if (isSaved) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== carId);
    } else {
      user.wishlist.push(carId);
    }

    await user.save();

    res.json({
      success: true,
      isWishlisted: !isSaved,
      message: isSaved ? 'Removed from wishlist.' : 'Added to wishlist.',
      data: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a car from the wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(id => id.toString() !== carId);
    await user.save();

    res.json({ success: true, message: 'Removed from wishlist.', data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWishlist, toggleWishlist, removeFromWishlist };
