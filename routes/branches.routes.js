const express = require("express");
const router = express.Router();
const { createBranch } = require("../controllers/branches.controller");

router.post("/", createBranch);

module.exports = router;

