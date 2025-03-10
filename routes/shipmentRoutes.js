const express = require("express");
const { createShipment, updateShipmentStatus, getShipments } = require("../controllers/shipmentController");
const router = express.Router();

router.post("/", createShipment);
router.get("/", getShipments);
router.put("/:id", updateShipmentStatus);
// ✅ Example API Route
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;
