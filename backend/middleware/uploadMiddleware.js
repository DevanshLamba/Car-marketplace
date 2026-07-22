const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary only when credentials are provided
const cloudinaryEnabled =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (cloudinaryEnabled) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// Store files in memory so we can forward them to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);

  if (ext && mime) return cb(null, true);
  cb(new Error('Only JPEG, JPG, PNG, and WEBP image files are allowed.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter
});

/**
 * Upload a single image buffer to Cloudinary.
 * Falls back to a Base64 data URI when Cloudinary is not configured.
 */
const uploadToCloudinary = (buffer, mimetype) => {
  if (cloudinaryEnabled) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'car_marketplace' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  }

  // Base64 fallback — suitable for local development without Cloudinary
  const b64 = Buffer.from(buffer).toString('base64');
  return Promise.resolve(`data:${mimetype};base64,${b64}`);
};

module.exports = { upload, uploadToCloudinary };
