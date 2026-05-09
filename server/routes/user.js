/*****************
USER ROUTE
******************/
const express = require("express");
const userController = require("../controllers/user");

const { verify, isLoggedIn, verifyAdmin } = require('../auth.js');

//[SECTION] Routing Component
const router = express.Router();

// CREATE USER
router.post("/register", userController.registerUser);

// LOGIN USER
router.post("/login", userController.loginUser);

// GET USER PROFILE
router.get("/details", verify, userController.getProfile);

// UPDATE PASSWORD
router.patch("/update-password", verify, userController.resetPassword);

module.exports = router;