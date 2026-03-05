const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Token Verify karne ke liye (Authentication)
exports.protect = async (req, res, next) => {
  let token;

  // Header mein check karna ki token hai ya nahi
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // "Bearer <token>" mein se token nikalna
      token = req.headers.authorization.split(' ')[1];

      // Token ko verify karna
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Database se user nikal kar request object mein daal dena
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Agle function (controller) par jao
    } catch (error) {
      console.log("❌ JWT Verification Error:", error.message);
      res.status(401).json({ message: 'Authorized nahi ho, token fail ho gaya' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Koi token nahi mila, entry denied' });
  }
};

// 2. Role Check karne ke liye (Authorization)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Agar user ka role allowed roles mein nahi hai toh block karo
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role ${req.user.role} ko yahan aane ki permission nahi hai` 
      });
    }
    next();
  };
};