const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'AutoVault Car Marketplace API is running',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Serve Frontend Production Build if present
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  console.log(`[Deployment] Serving static frontend build from ${frontendDist}`);
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const DEFAULT_PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(DEFAULT_PORT, () => {
    console.log(`===========================================================`);
    console.log(`🚀 AutoVault Live Production Server running on port ${DEFAULT_PORT}`);
    console.log(`🌐 Application URL: http://localhost:${DEFAULT_PORT}`);
    console.log(`📡 Health Check:     http://localhost:${DEFAULT_PORT}/api/health`);
    console.log(`🔑 Demo Credentials: demo@carhub.com / password123`);
    console.log(`===========================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const FALLBACK_PORT = Number(DEFAULT_PORT) + 1;
      console.warn(`[Port Warning] Port ${DEFAULT_PORT} in use. Attempting port ${FALLBACK_PORT}...`);
      app.listen(FALLBACK_PORT, () => {
        console.log(`🚀 AutoVault Live Production Server running on port ${FALLBACK_PORT}`);
        console.log(`🌐 Application URL: http://localhost:${FALLBACK_PORT}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer();
