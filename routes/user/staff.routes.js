const express = require("express");
const router = express.Router();
const staffService = require("../../services/user/staff.service");

// Add school staff
router.post("/", staffService.Create);

// Get all school staffs
router.get("/", staffService.ReadAll);

module.exports = router;
