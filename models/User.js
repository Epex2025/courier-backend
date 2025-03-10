const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "vendor", "driver", "customer"], default: "customer" },
});

module.exports = mongoose.model("User", userSchema);
