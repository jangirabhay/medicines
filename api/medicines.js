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

router.get("/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;

    if (!searchTerm) {
      return res.status(400).json({ message: "Provide search term in URL" });
    }

    const meds = await Medicine.find({
      $or: [
        { medName: { $regex: searchTerm, $options: "i" } },
        { medRelief: { $regex: searchTerm, $options: "i" } },
      ],
    }).limit(10);

    res.status(200).json({
      count: meds.length,
      data: meds
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updateMedicines = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateMedicines) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(updateMedicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
