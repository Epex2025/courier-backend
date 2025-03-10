const Route = require("../models/Route");

exports.assignRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: "Error assigning route", error });
  }
};

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate("driver deliveries");
    res.json(routes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching routes", error });
  }
};
