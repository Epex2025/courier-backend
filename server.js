require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const roleRoutes = require("./routes/roleRoutes");
const branchRoutes = require("./routes/branches.routes"); // ✅ Added Branch Management Route


const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Test Route
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/shipments", require("./routes/shipmentRoutes"));
app.use("/api/routes", require("./routes/routeRoutes"));
app.use("/api/roles", require("./routes/roleRoutes")); // ✅ Role Management Route
app.use("/api/branches", branchRoutes); // ✅ Branch Management Route
// ✅ Import API Routes
const shipmentRoutes = require("./routes/shipmentRoutes"); // Adjust the path as needed
app.use("/api/shipments", shipmentRoutes); // Define route prefix

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
