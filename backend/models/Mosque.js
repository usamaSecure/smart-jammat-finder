const mongoose = require("mongoose");

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
    Jummah: String,
  },
  adminPassword: { type: String, required: true }, // Admin login ke liye
});

module.exports = mongoose.model("Mosque", MosqueSchema);
