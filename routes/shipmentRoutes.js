const express = require("express");
const { createShipment, updateShipmentStatus, getShipments } = require("../controllers/shipmentController");
const router = express.Router();

router.post("/", createShipment);
router.get("/", getShipments);
router.put("/:id", updateShipmentStatus);

module.exports = router;
