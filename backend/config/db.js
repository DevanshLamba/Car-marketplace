const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('FATAL ERROR: MONGODB_URI environment variable is not set.');
    console.error('Set it in your .env file (development) or deployment environment variables (production).');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
