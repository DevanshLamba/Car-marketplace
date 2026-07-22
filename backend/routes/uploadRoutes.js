const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// @desc    Upload multiple vehicle images
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.array('images', 6), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please attach at least one image file' });
    }

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, file.mimetype)
    );

    const imageUrls = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      urls: imageUrls
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
