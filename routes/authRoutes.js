const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Ensure you have an Admin model
const router = express.Router();

// ✅ Debugging Log
console.log("✅ Auth Routes Loaded");

// ✅ Test Route to Check If Auth Routes Are Working
router.get("/test", (req, res) => {
    res.json({ message: "Auth route is working!" });
});

// ✅ Admin Login Route
router.post("/admin-login", async (req, res) => {
    console.log("🔹 Admin login attempt:", req.body.email); // Log email for debugging

    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("❌ Admin not found:", email);
            return res.status(401).json({ message: "Admin not found!" });
        }

        // ✅ Check Password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log("❌ Invalid credentials:", email);
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("✅ Login successful for:", email);
        res.json({ token, message: "Login successful!" });
    } catch (error) {
        console.error("🚨 Login error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;
