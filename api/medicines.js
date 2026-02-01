const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

router.get("/getMed", async (req, res) => {
  try {
    const meds = await Medicine.find({});
    res.json(meds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/addMed", async (req, res) => {
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

router.get("/:medName", async (req, res) => {
  try {
    const med = await Medicine.findOne({
      medName: req.params.medName,
    });
    if (!med) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json(med);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search by pain (returns array of matches)
router.get("/search/pain", async (req, res) => {
  try {
    const { pain } = req.query;
    if (!pain) {
      return res.status(400).json({ message: "Pain query parameter required" });
    }
    const meds = await Medicine.find({
      medHelps: { $in: [new RegExp(pain, "i")] },
    });
    if (meds.length === 0) {
      return res.status(404).json({ message: "No medicines found" });
    }
    res.json(meds);
  } catch (error) {
    console.log("Search error: ", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
