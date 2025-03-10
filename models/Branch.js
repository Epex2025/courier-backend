const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  pincode: { type: String, required: true },
  locations: { type: String },
  landmark: { type: String },
  squareFeet: { type: String },
  vehicleCount: { type: String },
  deliveryCapacity: { type: String },
  staffCount: { type: String },
  dailyExpense: { type: String },
  googleMapLocation: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Branch", BranchSchema);
