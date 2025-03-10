require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});



// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors({ origin: ["http://localhost:3000", "https://yourfrontend.com"], credentials: true }));
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/shipments", require("./routes/shipmentRoutes"));
app.use("/api/routes", require("./routes/routeRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/branches", require("./routes/branches.routes")); 

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
