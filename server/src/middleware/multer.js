const multer = require('multer');

// Files ko temporary memory mein rakhne ke liye storage setup
const storage = multer.diskStorage({});

// Ismein humne koi filter nahi lagaya taaki tum PDF, Video, Image sab bhej sako
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Limit: 50MB (Videos ke liye zaroori hai)
});

module.exports = upload;