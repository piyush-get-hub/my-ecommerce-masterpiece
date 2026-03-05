// const User = require('../models/User');
// const { sendEmail } = require('../utils/emailService');

// // 1. GET ALL PENDING SELLERS
// // Logic: Database se wo users dhoondo jo 'seller' hain par 'approved' nahi hain
// exports.getPendingSellers = async (req, res) => {
//   try {
//     const pendingSellers = await User.find({ 
//       role: 'seller', 
//       isApproved: false 
//     }).select('-password'); // Password security ke liye hata diya

//     res.status(200).json(pendingSellers);
//   } catch (error) {
//     res.status(500).json({ message: "Sellers fetch nahi ho paye", error: error.message });
//   }
// };

// // 2. APPROVE OR REJECT SELLER
// // Logic: Admin button dabayega aur database update ho jayega
// exports.approveSeller = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body || {}; // status can be 'approve' or 'reject'

//   if (!status) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Bhai, status ('approve' ya 'reject') toh bhejo!" 
//     });
//   }

//   try {
//     const seller = await User.findById(id);

//     if (!seller) {
//       return res.status(404).json({ message: "Seller nahi mila" });
//     }

//     if (status === 'approve') {
//       seller.isApproved = true;
//       await seller.save();

//       // EMAIL BINDING: Seller ko notification bhejenge
//       await sendEmail(
//         seller.email,
//         "Store Approved!🚀",
//         `Badhai ho ${seller.name}, aapka store approve ho gaya hai. Ab aap products upload kar sakte hain.`
//       );

//       res.status(200).json({ message: "Seller approve ho gaya!" });
//     } else {
//       // Agar reject karna ho
//       await sendEmail(seller.email, "Application Update", "Sorry, aapki request abhi approve nahi hui hai.");
//       res.status(200).json({ message: "Seller reject kar diya gaya." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Action fail ho gaya", error: error.message });
//   }
// };


// // 3. APPROVE PRODUCT LOGIC
// exports.approveProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product nahi mila" });

//     product.isApproved = true; // ✅ Admin ne hari jhandi de di
//     await product.save();

//     res.status(200).json({ success: true, message: "Product ab live hai! 🚀" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const User = require('../models/User');
const Product = require('../models/product'); // 🚀 1. YE MISSING THA (Model import karo)
const { sendEmail } = require('../utils/emailService');

// 1. GET ALL PENDING SELLERS (Tera purana code)
exports.getPendingSellers = async (req, res) => {
  try {
    const pendingSellers = await User.find({ 
      role: 'seller', 
      isApproved: false 
    }).select('-password');
    res.status(200).json(pendingSellers);
  } catch (error) {
    res.status(500).json({ message: "Sellers fetch nahi ho paye", error: error.message });
  }
};

// 2. APPROVE OR REJECT SELLER (Tera purana code)
exports.approveSeller = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {}; 
  if (!status) return res.status(400).json({ success: false, message: "Status bhejo bhai!" });

  try {
    const seller = await User.findById(id);
    if (!seller) return res.status(404).json({ message: "Seller nahi mila" });

    if (status === 'approve') {
      seller.isApproved = true;
      await seller.save();
      await sendEmail(seller.email, "Store Approved!🚀", `Badhai ho ${seller.name}...`);
      res.status(200).json({ message: "Seller approve ho gaya!" });
    } else {
      await sendEmail(seller.email, "Application Update", "Sorry...");
      res.status(200).json({ message: "Seller reject kar diya gaya." });
    }
  } catch (error) {
    res.status(500).json({ message: "Action fail ho gaya", error: error.message });
  }
};

// 🚀 2. YE FUNCTION BANANA ZAROORI HAI (List fetch karne ke liye)
// Iske bina frontend par error aayega: "Cannot GET /api/admin/pending-products"
exports.getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: {$ne:true} }).populate('seller', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Pending products nahi mil paye", error: error.message });
  }
};

// 3. APPROVE PRODUCT LOGIC (Fixed with try-catch)
exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product nahi mila" });

    product.isApproved = true; 
    await product.save();

    res.status(200).json({ success: true, message: "Product ab live hai! 🚀" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// server/src/controllers/adminController.js

exports.approveAllProducts = async (req, res) => {
  try {
    // 🚀 Logic: Saare products ko ek saath true kar do
    const result = await Product.updateMany(
      { isApproved: { $ne: true } }, 
      { $set: { isApproved: true } }
    );

    res.status(200).json({ 
      success: true, 
      message: `${result.modifiedCount} products approve ho gaye hain!` 
    });
  } catch (error) {
    res.status(500).json({ message: "Bulk approval fail!", error: error.message });
  }
};

