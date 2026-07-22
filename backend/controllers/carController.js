const Car = require('../models/Car');
const { isMongoConnected } = require('../config/db');
const {
  searchCars,
  getCarByIdStore,
  createCarStore,
  updateCarStore,
  deleteCarStore,
  getUserListingsStore
} = require('../utils/inMemoryStore');

// @desc    Get all cars with search, filtering, and sorting
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res, next) => {
  try {
    const { search, brand, fuelType, transmission, minPrice, maxPrice, sort } = req.query;

    if (isMongoConnected()) {
      let query = {};
      if (search) {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { title: searchRegex },
          { brand: searchRegex },
          { model: searchRegex },
          { location: searchRegex }
        ];
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

      let sortOptions = { createdAt: -1 };
      if (sort === 'price_asc') sortOptions = { price: 1 };
      else if (sort === 'price_desc') sortOptions = { price: -1 };
      else if (sort === 'newest') sortOptions = { createdAt: -1 };
      else if (sort === 'year_desc') sortOptions = { year: -1 };

      const cars = await Car.find(query).populate('sellerId', 'name email').sort(sortOptions);

      return res.json({
        success: true,
        count: cars.length,
        data: cars
      });
    }

    // In-Memory store fallback
    const cars = searchCars({ search, brand, fuelType, transmission, minPrice, maxPrice, sort });
    return res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const car = await Car.findById(req.params.id).populate('sellerId', 'name email createdAt');
      if (car) {
        return res.json({ success: true, data: car });
      }
    }

    // In-Memory store fallback
    const memCar = getCarByIdStore(req.params.id);
    if (!memCar) {
      return res.status(404).json({ success: false, message: 'Car listing not found' });
    }

    res.json({ success: true, data: memCar });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new car listing
// @route   POST /api/cars
// @access  Private
const createCar = async (req, res, next) => {
  try {
    const { title, brand, model, year, price, fuelType, transmission, kmDriven, location, description, images } = req.body;

    if (!title || !brand || !model || !year || !price || !fuelType || !transmission || !kmDriven || !location || !description) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields' });
    }

    const imageList = Array.isArray(images) && images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'];

    if (isMongoConnected()) {
      const car = await Car.create({
        title,
        brand,
        model,
        year: Number(year),
        price: Number(price),
        fuelType,
        transmission,
        kmDriven: Number(kmDriven),
        location,
        description,
        images: imageList,
        sellerId: req.user._id
      });

      return res.status(201).json({
        success: true,
        message: 'Car listing published successfully',
        data: car
      });
    }

    // In-Memory store fallback
    const memCar = createCarStore({
      title, brand, model, year, price, fuelType, transmission, kmDriven, location, description, images: imageList
    }, req.user);

    res.status(201).json({
      success: true,
      message: 'Car listing published successfully',
      data: memCar
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update car listing
// @route   PUT /api/cars/:id
// @access  Private (Owner only)
const updateCar = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      let car = await Car.findById(req.params.id);
      if (car) {
        if (car.sellerId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ success: false, message: 'Not authorized to edit this listing' });
        }
        car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        return res.json({ success: true, message: 'Car listing updated successfully', data: car });
      }
    }

    // In-Memory store fallback
    const updated = updateCarStore(req.params.id, req.body, req.user._id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Car listing not found' });
    }
    if (updated === 'UNAUTHORIZED') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this listing' });
    }

    res.json({ success: true, message: 'Car listing updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete car listing
// @route   DELETE /api/cars/:id
// @access  Private (Owner only)
const deleteCar = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const car = await Car.findById(req.params.id);
      if (car) {
        if (car.sellerId.toString() !== req.user._id.toString()) {
          return res.status(403).json({ success: false, message: 'Not authorized to delete this listing' });
        }
        await car.deleteOne();
        return res.json({ success: true, message: 'Car listing removed successfully' });
      }
    }

    // In-Memory store fallback
    const deleted = deleteCarStore(req.params.id, req.user._id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Car listing not found' });
    }
    if (deleted === 'UNAUTHORIZED') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this listing' });
    }

    res.json({ success: true, message: 'Car listing removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's own car listings
// @route   GET /api/cars/user/listings
// @access  Private
const getUserListings = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const cars = await Car.find({ sellerId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, count: cars.length, data: cars });
    }

    // In-Memory store fallback
    const cars = getUserListingsStore(req.user._id);
    res.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getUserListings
};
