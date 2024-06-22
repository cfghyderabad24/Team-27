const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

// Routes
router.post("/register", registerController); // Correctly using registerController
router.get("/all-users", getAllUsers); // Correctly using getAllUsers
router.post("/login", loginController); // Correctly using loginController

module.exports = router;
