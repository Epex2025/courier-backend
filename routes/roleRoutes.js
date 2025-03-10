const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

// ✅ Create Role
router.post("/", async (req, res) => {
  try {
    console.log("🔹 Incoming Role Creation Request:", req.body);

    const { name } = req.body;

    if (!name) {
      console.log("❌ Role name is missing");
      return res.status(400).json({ message: "Role name is required" });
    }

    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      console.log("⚠️ Role already exists:", existingRole);
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = new Role({ name, createdDate: new Date(), status: "Active" });
    await newRole.save();

    console.log("✅ Role Created Successfully:", newRole);
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    console.error("❌ Error creating role:", error);
    res.status(500).json({ message: "Failed to create role", error: error.message });
  }
});

// ✅ Get All Roles
router.get("/", async (req, res) => {
  try {
    console.log("🔹 Fetching All Roles...");
    const roles = await Role.find();
    console.log("✅ Roles Fetched:", roles.length);
    res.json(roles);
  } catch (error) {
    console.error("❌ Error fetching roles:", error);
    res.status(500).json({ message: "Failed to fetch roles", error: error.message });
  }
});

// ✅ Update Role Status
router.put("/:id", async (req, res) => {
  try {
    console.log("🔹 Updating Role Status:", req.params.id, req.body);

    const { id } = req.params;
    const { status } = req.body;

    if (!status || (status !== "Active" && status !== "Inactive")) {
      console.log("❌ Invalid status value:", status);
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRole = await Role.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRole) {
      console.log("❌ Role not found for update:", id);
      return res.status(404).json({ message: "Role not found" });
    }

    console.log("✅ Role Status Updated:", updatedRole);
    res.json({ message: "Role status updated successfully", updatedRole });
  } catch (error) {
    console.error("❌ Error updating role status:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Delete Role
router.delete("/:id", async (req, res) => {
  try {
    console.log("🔹 Deleting Role:", req.params.id);
    const { id } = req.params;

    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      console.log("❌ Role not found for deletion:", id);
      return res.status(404).json({ message: "Role not found" });
    }

    console.log("✅ Role Deleted Successfully:", deletedRole);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting role:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
