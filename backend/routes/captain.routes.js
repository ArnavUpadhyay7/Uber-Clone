const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname").isLength({ min: 3 }).withMessage('First name must have atleast 3 letters'),
  body("password").isLength({ min: 6 }).withMessage('Password must have atleast 6 letters'),
  body("vehicle.color").isLength({ min: 3 }).withMessage('Color must have atleast 3 letters'),
  body("vehicle.plate").isLength({ min: 3 }).withMessage('Plate must have atleast 6 letters'),
  body("vehicle.capacity").isInt({ min: 1 }).withMessage('Capacity must be atleast 1'),
  body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage('Invalid vehicle type')
  
], captainController.registerCaptain);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 6 }).withMessage('Password must have atleast 6 letters')
], captainController.loginCaptain);

router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;