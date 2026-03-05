const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/emailService');

// 1. REGISTER: Naya account banane ke liye (User ya Seller)
exports.registerUser = async (req, res) => {
  const { name, email, password, role, storeName, description } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User pehle se exist karta hai" });

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User instance
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      // Agar direct seller register kar raha hai toh details yahi save hongi
      storeDetails: role === 'seller' ? { storeName, description } : {}
    });

    await user.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. LOGIN: JWT Token generate karne ke liye
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Ghalat credentials" });

    // Password Match check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Ghalat credentials" });

    // JWT Token: Isme id, role aur isApproved status hai
    const token = jwt.sign(
      { id: user._id, role: user.role, isApproved: user.isApproved },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// 3. BECOME SELLER: Existing User ko Seller mein convert karna
exports.registerAsSeller = async (req, res) => {
  const { storeName, description } = req.body;

  try {
    // req.user.id 'protect' middleware se aata hai
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User nahi mila" });

    // Update to Seller logic
    user.role = 'seller';
    user.isApproved = false; // Admin approval needed
    user.storeDetails = { storeName, description };

    await user.save();

    // TRIGGER EMAIL TO ADMIN: Notification alert
    const adminEmail = process.env.EMAIL_USER; 
    await sendEmail(
      adminEmail,
      "New Seller Request",
      `Nayi application aayi hai!\n\nStore: ${storeName}\nSeller: ${user.name}\nEmail: ${user.email}`
    );

    res.status(200).json({ 
      message: "Application submitted! Wait for Admin approval.",
      user 
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};