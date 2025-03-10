const Shipment = require("../models/Shipment");

exports.createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: "Error creating shipment", error });
  }
};

exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(400).json({ message: "Error fetching shipments", error });
  }
};

exports.updateShipmentStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ message: "Error updating shipment", error });
  }
};
