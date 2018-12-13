console.log("models loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  creator: { type: String },
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
