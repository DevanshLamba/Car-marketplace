const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isMongoConnected } = require('../config/db');
const { findUserById } = require('../utils/inMemoryStore');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'super_secret_jwt_key_car_marketplace_2026_placement_project'
      );

      if (isMongoConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        // Fallback to in-memory store
        const memUser = findUserById(decoded.id);
        if (memUser) {
          req.user = {
            _id: memUser._id,
            name: memUser.name,
            email: memUser.email,
            wishlist: memUser.wishlist
          };
        }
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User account not found for this token' });
      }

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no bearer token provided' });
  }
};

module.exports = { protect };
