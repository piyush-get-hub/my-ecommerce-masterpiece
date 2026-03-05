// const express = require('express');
// const { createProduct } = require('../controllers/productController');
// // 'authorize' ko bhi import karein
// const { protect, authorize } = require('../middleware/authMiddleware'); 
// const upload = require('../middleware/multer'); // Tera multer setup

// const router = express.Router();

// // Logic: Logged in (protect) + Role 'seller' (authorize)
// router.post(
//   '/admin/product/new', 
//   protect, 
//   authorize('seller'),
//   upload.array('attachments', 5), // Sirf seller ko allow karega
//   createProduct
// );

// module.exports = router;


const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController'); // 👈 getProducts add kiya
const { protect, authorize } = require('../middleware/authMiddleware'); 
const upload = require('../middleware/multer');

const router = express.Router();

// 1. PUBLIC ROUTE: Sabhi users products dekh sakein (With Filters)
// Path: GET /api/products
router.route('/products').get(getProducts);

// 2. ADMIN/SELLER ROUTE: Naya product add karne ke liye
// Path: POST /api/admin/product/new
router.post(
  '/admin/product/new', 
  protect, 
  authorize('seller'),
  upload.array('attachments', 5), 
  createProduct
);

module.exports = router;