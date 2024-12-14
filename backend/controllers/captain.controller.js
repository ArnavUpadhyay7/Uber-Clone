const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const captain = await captainModel.findOne({ email });
    if (captain) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const newCaptain = await captainService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    });

    const token = newCaptain.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({ token, newCaptain });
  } catch (error) {
    // console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating captain" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await captainModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    // console.error("Error creating user:", error);
    res.status(500).json({ message: "Error Logging user" });
  }
};

module.exports.getProfile = async (req, res, next) => {
  console.log(req.user);
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token;

  await blacklistModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};
