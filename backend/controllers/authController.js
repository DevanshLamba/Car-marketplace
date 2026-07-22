const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isMongoConnected } = require('../config/db');
const { findUserByEmail, findUserById, createUser } = require('../utils/inMemoryStore');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_key_car_marketplace_2026_placement_project',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all required fields' });
    }

    if (isMongoConnected()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }

      const user = await User.create({ name, email, password });
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          wishlist: user.wishlist,
          token
        }
      });
    } else {
      // In-Memory Fallback
      const existingMemUser = findUserByEmail(email);
      if (existingMemUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }

      const memUser = await createUser({ name, email, password });
      const token = generateToken(memUser._id);

      return res.status(201).json({
        success: true,
        message: 'Account registered successfully (Demo Mode)',
        data: {
          _id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          wishlist: memUser.wishlist,
          token
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    // Try MongoDB first if connected
    if (isMongoConnected()) {
      const user = await User.findOne({ email }).select('+password');
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        return res.json({
          success: true,
          message: 'Logged in successfully',
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            wishlist: user.wishlist,
            token
          }
        });
      }
    }

    // Fallback to In-Memory Store
    const memUser = findUserByEmail(email);
    if (memUser) {
      const isMatch = await bcrypt.compare(password, memUser.password);
      if (isMatch) {
        const token = generateToken(memUser._id);
        return res.json({
          success: true,
          message: 'Logged in successfully',
          data: {
            _id: memUser._id,
            name: memUser.name,
            email: memUser.email,
            wishlist: memUser.wishlist,
            token
          }
        });
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const user = await User.findById(req.user._id).populate('wishlist');
      if (user) {
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            wishlist: user.wishlist,
            createdAt: user.createdAt
          }
        });
      }
    }

    // In-Memory store fallback
    const memUser = findUserById(req.user._id);
    if (!memUser) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    res.json({
      success: true,
      data: {
        _id: memUser._id,
        name: memUser.name,
        email: memUser.email,
        wishlist: memUser.wishlist,
        createdAt: memUser.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
