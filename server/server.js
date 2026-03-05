// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const colors=require("colors")
// const path=require('path')

// // 1. Routes Import (Jo humne pehle banaye hain)
// const authRoutes = require('./src/routes/authRoutes');
// const adminRoutes = require('./src/routes/adminRoutes');
// const productRoutes=require('./src/routes/productRoutes')

// // .env configuration (Security ke liye)
// dotenv.config();

// const app = express();

// // 2. Global Middlewares
// app.use(cors()); // Frontend (Vite) aur Backend ke beech ki deewar hatane ke liye
// app.use(express.json()); // Frontend se aane wale JSON data ko samajhne ke liye

// // 3. API Binding (Raste connect karna)
// // Sabhi auth related APIs '/api/auth' se shuru hongi
// app.use('/api/auth', authRoutes);

// // Sabhi admin related APIs '/api/admin' se shuru hongi
// app.use('/api/admin', adminRoutes);

// app.use('/api',productRoutes)

// // 4. Database Connection (MongoDB)
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected...'.bgGreen.black))
//   .catch(err => console.error('❌ MongoDB Connection Error:'.bgRed, err));

// // 5. Server Start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`.bgCyan.black);
// });


// 1. Sabse upar - Sabse pehle! 
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require("colors");

// 2. Routes Import
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

// 3. Middlewares
app.use(cors()); 
app.use(express.json()); 

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', productRoutes);

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected...'.bgGreen.black);
    // Confirmation ke liye
    console.log(`☁️  Cloudinary Name: ${process.env.CLOUDINARY_CLOUD_NAME}`.bgYellow.black);
  })
  .catch(err => console.error('❌ MongoDB Connection Error:'.bgRed, err));

// 6. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.bgCyan.black);
});