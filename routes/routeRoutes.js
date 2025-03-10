const express = require("express");
const { assignRoute, getRoutes } = require("../controllers/routeController");
const router = express.Router();

router.post("/", assignRoute);
router.get("/", getRoutes);

module.exports = router;
