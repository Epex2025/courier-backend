const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  awb: { type: String, unique: true },
  sender: String,
  recipient: String,
  status: { type: String, enum: ["pending", "out-for-delivery", "delivered"], default: "pending" },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Shipment", shipmentSchema);
