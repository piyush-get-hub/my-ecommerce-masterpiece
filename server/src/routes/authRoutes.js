const express = require('express');
const router = express.Router();

// Controllers Import
const { 
  registerUser, 
  loginUser, 
  registerAsSeller 
} = require('../controllers/authController');

// Middleware Import (Bouncer)
const { protect } = require('../middleware/authMiddleware');

// 1. PUBLIC ROUTES
// Naya account banana aur login karna
router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. PROTECTED ROUTE
// Sirf logged-in user hi Seller banne ki request bhej sakta hai
// 'protect' middleware ensures req.user.id is available
router.put('/become-seller', protect, registerAsSeller);

module.exports = router;