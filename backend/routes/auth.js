const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Token ke liye ye zaruri hai
const User = require("../models/User");

// 1. SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in Signup:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. LOGIN ROUTE (Ye naya part hai jo add karna hai)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // User dhoondo
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Token banao
    const token = jwt.sign({ id: user._id }, "SECRET_KEY_123", {
      expiresIn: "1h",
    });

    // User data aur token wapis bhejo
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log("Error in Login:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
