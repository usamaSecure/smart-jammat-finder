const express = require("express");
const router = express.Router();
const Mosque = require("../models/Mosque");

// 1. Admin Login API
router.post("/login", async (req, res) => {
  try {
    const { mosqueId, password } = req.body;
    const mosque = await Mosque.findById(mosqueId);

    if (mosque && mosque.adminPassword === password) {
      res.status(200).json({ success: true, message: "Login Successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid Password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. Update Timings API
router.put("/update-timings/:id", async (req, res) => {
  try {
    const updatedMosque = await Mosque.findByIdAndUpdate(
      req.params.id,
      { $set: { timings: req.body.timings } },
      { new: true },
    );
    res.status(200).json(updatedMosque);
  } catch (err) {
    res.status(500).json({ error: "Failed to update timings" });
  }
});

module.exports = router;
