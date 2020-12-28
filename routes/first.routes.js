const express = require("express");
const router = express.Router();
const firstService = require("../services/first.service");

// Create first user and school admin role
router.get("/", firstService.Create);

module.exports = router;
