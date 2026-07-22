const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getUserListings
} = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCars)
  .post(protect, createCar);

router.get('/user/listings', protect, getUserListings);

router.route('/:id')
  .get(getCarById)
  .put(protect, updateCar)
  .delete(protect, deleteCar);

module.exports = router;
