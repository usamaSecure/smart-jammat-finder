require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ==========================================
// 1. CONFIGURATION & DATABASE CONNECTION
// ==========================================
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://nasir:smart123@smart-finder.8qaekm4.mongodb.net/smart-jamat-finder";

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database connection established successfully."))
  .catch((err) =>
    console.error("❌ Database connection failed: ", err.message),
  );

// ==========================================
// 2. DATABASE SCHEMAS (Tables)
// ==========================================

// Mosque Schema
const MosqueSchema = new mongoose.Schema({
  name: String,
  location: String,
  lat: Number,
  lon: Number,
  timings: {
    Fajr: String,
    Zuhr: String,
    Asr: String,
    Maghrib: String,
    Isha: String,
  },
  adminPassword: { type: String, required: true },
});
const Mosque = mongoose.model("Mosque", MosqueSchema);

// User Schema (For Login/Signup)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// ==========================================
// 3. API ROUTES
// ==========================================

// --- USER AUTHENTICATION ROUTES ---

// Signup API
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check agar user pehle se mojood hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Naya user save karo
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "Account created successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error during signup.", error: err.message });
  }
});

// Login API
// Login API (server.js mein replace karein)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.status(200).json({
        success: true,
        token: "user_logged_in_token",
        // NAYA CODE: User ka data bhi frontend ko bhejein
        user: { name: user.name, email: user.email },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error during login." });
  }
});

// --- MOSQUE & ADMIN ROUTES ---

// Get All Mosques for Map
app.get("/api/mosques", async (req, res) => {
  try {
    const allMosques = await Mosque.find();
    res.status(200).json(allMosques);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve mosque data." });
  }
});

// Admin Login for a Specific Mosque
app.post("/api/admin/login", async (req, res) => {
  const { mosqueId, password } = req.body;
  try {
    const mosque = await Mosque.findById(mosqueId);
    if (mosque && mosque.adminPassword === password) {
      res
        .status(200)
        .json({ success: true, message: "Authentication successful." });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid credentials provided." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update Timings (Admin Only)
app.put("/api/admin/update-timings/:id", async (req, res) => {
  try {
    const updated = await Mosque.findByIdAndUpdate(
      req.params.id,
      { $set: { timings: req.body.timings } },
      { new: true },
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update prayer timings." });
  }
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("Smart Jamat Finder API is operational.");
});

// ==========================================
// 4. START SERVER
// ==========================================
app.listen(PORT, () =>
  console.log(`🚀 Server is actively running on port ${PORT}`),
);
