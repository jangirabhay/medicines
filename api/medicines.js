const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

router.get("/", async (req, res) => {
  try {
    const meds = await Medicine.find({});
    res.json(meds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMed = new Medicine(req.body);
    const saveMed = await newMed.save();
    console.log(saveMed);  // Log before response
    return res.status(201).json(saveMed);
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { search } = req.query; 

    if (!search) return res.status(400).json({ message: "Provide query 'q'" });

    const meds = await Medicine.find({
      medName: { $regex: search, $options: "i" }
    });

    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
