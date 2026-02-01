const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  midId: Number,
  medName: String,
  medWhat: String,
  medHelps: [String],
  medWorks: [String],
  medAvailable: Array,
  medDosage: Array,
  medTake: [String],
});

module.exports = mongoose.model("Medicine", MedicineSchema);
