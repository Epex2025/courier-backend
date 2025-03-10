const mongoose = require("mongoose");

// Define Role Schema
const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdDate: { type: Date, default: Date.now }
});

// Middleware to format createdDate before sending response
RoleSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.createdDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(ret.createdDate); // Converts to DD/MM/YYYY format
        return ret;
    }
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
