const mongoose = require('mongoose');

const dosageSchema = new mongoose.Schema({
  group: { type: String, required: true },
  dose: { type: String, required: true },
  frequency: { type: String },
  maximum: { type: String },
  note: { type: String }
});

const medFormSchema = new mongoose.Schema({
  type: { type: String, required: true },
  for: { type: String },
  strength: { type: [String] },
  route: { type: String },
  instruction: { type: String }
});

const medicineSchema = new mongoose.Schema({
  medId: { type: Number, required: true, unique: true },
  medName: { type: String, required: true },
  medWhat: { type: String },
  medImage: { type: String },
  medHelps: { type: [String] },
  // medWork: { type: [String] },
  medForm: medFormSchema,
  medDosage: [dosageSchema],
  medTake: { type: [String] },
  medAvoid: {type : [String]},
  medRelief: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
