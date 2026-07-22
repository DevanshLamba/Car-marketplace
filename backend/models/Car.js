const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a listing title'],
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Please provide car brand (e.g. BMW, Toyota)'],
      trim: true
    },
    model: {
      type: String,
      required: [true, 'Please provide car model (e.g. M3, Camry)'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Please specify manufacturing year'],
      min: [1950, 'Year must be after 1950'],
      max: [new Date().getFullYear() + 1, 'Invalid manufacturing year']
    },
    price: {
      type: Number,
      required: [true, 'Please specify price in USD/INR'],
      min: [0, 'Price cannot be negative']
    },
    fuelType: {
      type: String,
      required: [true, 'Please select fuel type'],
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
    },
    transmission: {
      type: String,
      required: [true, 'Please select transmission type'],
      enum: ['Manual', 'Automatic']
    },
    kmDriven: {
      type: Number,
      required: [true, 'Please specify distance driven in kilometers'],
      min: [0, 'Kilometers cannot be negative']
    },
    location: {
      type: String,
      required: [true, 'Please specify car location / city'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one image URL is required'
      }
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for search optimization
carSchema.index({ title: 'text', brand: 'text', model: 'text', location: 'text' });

module.exports = mongoose.model('Car', carSchema);
