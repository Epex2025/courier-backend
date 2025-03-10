const Branch = require("../models/Branch");

const createBranch = async (req, res) => {
  try {
    const newBranch = new Branch(req.body);
    await newBranch.save();
    res.status(201).json({ message: "Branch created successfully", branch: newBranch });
  } catch (error) {
    res.status(500).json({ message: "Error creating branch", error });
  }
};

module.exports = { createBranch };
