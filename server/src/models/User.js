const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  
  // ROLE LOGIC
  role: { 
    type: String, 
    enum: ['user', 'seller', 'admin'], 
    default: 'user' 
  },

  // APPROVAL LOGIC
  // If role is 'user', approved is true. If 'seller', approved is false.
  isApproved: { 
    type: Boolean, 
    default: function() {
      return this.role === 'user'; 
    } 
  },

  // DATA BINDING: Details specifically for the Seller role
  storeDetails: {
    storeName: { type: String },
    description: { type: String },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);