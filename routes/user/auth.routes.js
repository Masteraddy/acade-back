const express = require("express");
const router = express.Router();
const authService = require("../../services/user/auth.service");
const auth = require("../../middlewares/auth");

// For Login
router.post("/", authService.loginToServer);

// Get Logged User
router.get("/", auth, authService.getLoggedUser);

module.exports = router;
