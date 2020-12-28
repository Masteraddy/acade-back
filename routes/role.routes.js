const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const roleService = require("../services/role.service");

// Get All Roles
router.get("/", roleService.ReadAll);

// Get A Role
router.get("/:id", roleService.ReadOne);

// Add A Role
router.post("/", auth, roleService.Create);

// Update A Role
router.patch("/:id", auth, roleService.Update);

// Delete A Role
router.delete("/:id", auth, roleService.Delete);

module.exports = router;
