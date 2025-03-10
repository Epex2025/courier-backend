const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shipment" }],
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
});

module.exports = mongoose.model("Route", routeSchema);
