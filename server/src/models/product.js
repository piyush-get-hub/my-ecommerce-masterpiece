const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Product ka naam zaroori hai"],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "Description likhna zaroori hai"] 
  },
 price: { 
  type: Number, 
  required: [true, "Price batana zaroori hai"],
  // maxLength ki jagah max use karo (e.g., 9 crore tak ka price)
  max: [99999999, "Price itna bada nahi ho sakta"] 
},
  category: { 
    type: String, 
    required: [true, "Category select karein"] 
  },
  ratings: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  stock: { 
    type: Number, 
    required: [true, "Stock batana zaroori hai"],
    default: 1 
  },
  
  // ✨ Yahan humne badlav kiya hai: Universal File Support
  attachments: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      fileType: {
        type: String, // Ye save karega: 'image', 'video', ya 'raw' (PDF ke liye)
        required: true,
      }
    }
  ],

  isApproved: { 
    type: Boolean, 
    default: false // ✨ Naya product hamesha 'false' rahega jab tak Admin approve na kare
  },

  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);