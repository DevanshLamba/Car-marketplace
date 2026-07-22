const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/car_marketplace', {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Local MongoDB service is offline.`);
    console.warn(`[Database Auto-Fallback] Activated In-Memory Demo Data Store. Demo logins (demo@carhub.com / password123) are 100% READY!`);
  }
};

const isMongoConnected = () => isConnected;

module.exports = { connectDB, isMongoConnected };
