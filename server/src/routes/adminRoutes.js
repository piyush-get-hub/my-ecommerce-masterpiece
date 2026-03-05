const express = require('express');
const router = express.Router();

// 1. Dono functions import karo (getPendingSellers ko add kiya)
const { approveSeller, getPendingSellers,getPendingProducts,approveProduct,approveAllProducts } = require('../controllers/adminController');

// 2. Middleware import
const { protect, authorize } = require('../middleware/authMiddleware');

// 3. GET ROUTE (Ye missing tha): Pending sellers lane ke liye
// URL: /api/admin/pending-sellers
router.get(
  '/pending-sellers', 
  protect, 
  authorize('admin'), 
  getPendingSellers 
);

router.get(
  '/pending-products', 
  protect, 
  authorize('admin'), 
  getPendingProducts 
);

// 4. PUT ROUTE: Approve karne ke liye (Ye tune pehle se likha tha)
router.put(
  '/approve-seller/:id', 
  protect, 
  authorize('admin'), 
  approveSeller
);

router.put('/product/approve/:id', protect, authorize('admin'), approveProduct);

router.put('/products/approve-all', protect, authorize('admin'), approveAllProducts);

module.exports = router;