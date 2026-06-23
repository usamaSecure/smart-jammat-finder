const router = require("express").Router();
const Mosque = require("../models/Mosque");

// GET /api/mosques
router.get("/", async (req, res) => {
  try {
    // Sare mosques DB se laao
    const mosques = await Mosque.find();
    res.status(200).json(mosques);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/mosques (Testing ke liye data add karne ke liye)
router.post("/", async (req, res) => {
  const newMosque = new Mosque(req.body);
  try {
    const savedMosque = await newMosque.save();
    res.status(200).json(savedMosque);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
