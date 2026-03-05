// const Product = require('../models/product');
// const cloudinary = require('../utils/cloudinary');
// const fs = require('fs');
// const APIFeatures = require('../utils/apiFeatures');

// // ==========================================f
// // 1. GET ALL PRODUCTS (Search + Filter + Pagination)
// // ==========================================
// // @route   GET /api/v1/products
// exports.getProducts = async (req, res) => {
//   try {
//     const resPerPage = 8;
//     const productsCount = await Product.countDocuments();

//     // 1. Search aur Filter hamesha apply karo
//     // APIFeatures class khud handle kar legi agar query khali hai toh
//     let apiFeatures = new APIFeatures(Product.find({ isApproved: true }), req.query)
//   .search()
//   .filter();

//     // 2. Filtered count nikalne ke liye clone karo (Pagination se pehle)
//     const filteredDocs = await apiFeatures.query.clone(); 
//     const filteredProductsCount = filteredDocs.length;

//     // 3. Phir Sort aur Pagination lagao
//     apiFeatures.sort().pagination(resPerPage);
//     const products = await apiFeatures.query;

//     res.status(200).json({
//       success: true,
//       productsCount,
//       filteredProductsCount,
//       resPerPage,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ==========================================
// // 2. CREATE NEW PRODUCT (With Cloudinary)
// // ==========================================
// // @route   POST /api/v1/admin/product/new
// exports.createProduct = async (req, res) => {
//   try {
//     const files = req.files;
//     let attachments = [];

//     // 1. Check karo ki files aayi hain ya nahi
//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Kam se kam ek product image upload karni zaroori hai!"
//       });
//     }

//     // 2. Parallel Upload logic (Cloudinary)
//     attachments = await Promise.all(
//       files.map(async (file) => {
//         try {
//           const result = await cloudinary.uploader.upload(file.path, {
//             folder: "masterpiece_products",
//             resource_type: "auto",
//           });

//           // Upload hote hi local temporary file delete karo
//           if (fs.existsSync(file.path)) {
//             fs.unlinkSync(file.path);
//           }

//           return {
//             public_id: result.public_id,
//             url: result.secure_url,
//             fileType: result.resource_type
//           };
//         } catch (uploadErr) {
//           console.error("Cloudinary Upload Error:", uploadErr);
//           throw new Error("Cloudinary par file upload fail ho gayi");
//         }
//       })
//     );

//     // 3. Request body se data nikalo
//     const { name, description, price, category, stock } = req.body;

//     // 4. Database mein entry create karo
//     const product = await Product.create({
//       name,
//       description,
//       price: Number(price),
//       category,
//       stock: Number(stock) || 0,
//       attachments,
//       seller: req.user._id // Protect middleware se aa raha hai
//     });

//     // 5. Success Response
//     res.status(201).json({
//       success: true,
//       message: "Product 'Masterpiece' category mein create ho gaya hai! 🚀",
//       product
//     });

//   } catch (error) {
//     // SECURITY: Crash hone par local files clean karo
//     if (req.files) {
//       req.files.forEach(file => {
//         if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
//       });
//     }

//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error: Product create nahi ho paaya", 
//       error: error.message 
//     });
//   }
// };



const Product = require('../models/product');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures');

// ==========================================f
// 1. GET ALL PRODUCTS (Search + Filter + Pagination)
// ==========================================
// @route   GET /api/v1/products
exports.getProducts = async (req, res) => {
try {
    // 🚀 Badlav: Agar URL mein limit hai toh wo lo, varna default 8
    const resPerPage = Number(req.query.limit) || 8; 
    const productsCount = await Product.countDocuments();

    let apiFeatures = new APIFeatures(Product.find({ isApproved: true }), req.query)
      .search()
      .filter();

    // 2. Filtered count nikalne ke liye clone karo (Pagination se pehle)
    const filteredDocs = await apiFeatures.query.clone(); 
    const filteredProductsCount = filteredDocs.length;

    // 3. Phir Sort aur Pagination lagao
    apiFeatures.sort().pagination(resPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      productsCount,
      filteredProductsCount,
      resPerPage,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ==========================================
// 2. CREATE NEW PRODUCT (With Cloudinary)
// ==========================================
// @route   POST /api/v1/admin/product/new
exports.createProduct = async (req, res) => {
  try {
    const files = req.files;
    let attachments = [];

    // 1. Check karo ki files aayi hain ya nahi
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Kam se kam ek product image upload karni zaroori hai!"
      });
    }

    // 2. Parallel Upload logic (Cloudinary)
    attachments = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "masterpiece_products",
            resource_type: "auto",
          });

          // Upload hote hi local temporary file delete karo
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }

          return {
            public_id: result.public_id,
            url: result.secure_url,
            fileType: result.resource_type
          };
        } catch (uploadErr) {
          console.error("Cloudinary Upload Error:", uploadErr);
          throw new Error("Cloudinary par file upload fail ho gayi");
        }
      })
    );

    // 3. Request body se data nikalo
    const { name, description, price, category, stock } = req.body;

    // 4. Database mein entry create karo
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 0,
      attachments,
      seller: req.user._id // Protect middleware se aa raha hai
    });

    // 5. Success Response
    res.status(201).json({
      success: true,
      message: "Product 'Masterpiece' category mein create ho gaya hai! 🚀",
      product
    });

  } catch (error) {
    // SECURITY: Crash hone par local files clean karo
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }

    res.status(500).json({ 
      success: false, 
      message: "Server Error: Product create nahi ho paaya", 
      error: error.message 
    });
  }
};
