const Car = require('../models/Car');

// @desc    Get all cars with optional search, filter, sort
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res, next) => {
  try {
    const { search, brand, fuelType, transmission, minPrice, maxPrice, sort } = req.query;

    const query = {};

    if (search) {
      const re = new RegExp(search.trim(), 'i');
      query.$or = [{ title: re }, { brand: re }, { model: re }, { location: re }];
    }

    if (brand && brand !== 'All') {
      query.brand = new RegExp(`^${brand.trim()}$`, 'i');
    }

    if (fuelType && fuelType !== 'All') {
      query.fuelType = fuelType;
    }

    if (transmission && transmission !== 'All') {
      query.transmission = transmission;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      year_desc: { year: -1 },
      newest: { createdAt: -1 }
    };
    const sortOption = sortMap[sort] || { createdAt: -1 };

    const cars = await Car.find(query)
      .populate('sellerId', 'name email')
      .sort(sortOption)
      .lean();

    res.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('sellerId', 'name email createdAt')
      .lean();

    if (!car) {
      return res.status(404).json({ success: false, message: 'Car listing not found.' });
    }

    res.json({ success: true, data: car });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new car listing
// @route   POST /api/cars
// @access  Private
const createCar = async (req, res, next) => {
  try {
    const {
      title, brand, model, year, price,
      fuelType, transmission, kmDriven,
      location, description, images
    } = req.body;

    if (!title || !brand || !model || !year || !price || !fuelType || !transmission || !kmDriven || !location || !description) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const imageList = Array.isArray(images) && images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop'];

    const car = await Car.create({
      title, brand, model,
      year: Number(year),
      price: Number(price),
      fuelType, transmission,
      kmDriven: Number(kmDriven),
      location, description,
      images: imageList,
      sellerId: req.user._id
    });

    res.status(201).json({ success: true, data: car });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a car listing (owner only)
// @route   PUT /api/cars/:id
// @access  Private
const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ success: false, message: 'Car listing not found.' });
    }

    if (car.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this listing.' });
    }

    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a car listing (owner only)
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ success: false, message: 'Car listing not found.' });
    }

    if (car.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this listing.' });
    }

    await car.deleteOne();

    res.json({ success: true, message: 'Listing deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get listings by the logged-in user
// @route   GET /api/cars/user/listings
// @access  Private
const getUserListings = async (req, res, next) => {
  try {
    const cars = await Car.find({ sellerId: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar, getUserListings };
