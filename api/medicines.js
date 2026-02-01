const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

router.get("/", async (req, res) => {
  // get all medicines
  const meds = await Medicine.find({});
  res.json(meds);
});

router.get("/:medName", async (req, res) => {
  try {
    const med = await Medicine.findOne({
      medName: req.params.medName
    });

    if (!med) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.json(med);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// search by pain...
router.get("/search/pain", async (req, res) => {
  const { pain } = req.query;
  const med = await Medicine.findOne({
    medHelps: { $in: [new RegExp(pain, "i")] },
  });
  res.json(med);
});

module.exports = router;
