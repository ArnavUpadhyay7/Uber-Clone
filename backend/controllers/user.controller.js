const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const newUser = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = newUser.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ token, newUser });

  } catch (error) {
    // console.error("Error creating user:", error);    
    // res.status(500).json({ message: "Error creating user" });
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
      return res.status(401).json({message: "Invalid credentials!"});
    }
    const isValidPassword = await user.comparePassword(password);
    if(!isValidPassword){
      return res.status(401).json({message: "Invalid credentials!"});
      }
      const token = user.generateAuthToken();
      res.cookie('token', token);
      res.status(200).json({token, user});  
  } catch(error){
    // console.error("Error creating user:", error);
    res.status(500).json({ message: "Error Logging user" });
  }
}

module.exports.getProfile = async (req, res, next) => {
  console.log(req.user);
  res.status(200).json(req.user);  
}

module.exports.logoutUser = async(req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token;

  await blacklistModel.create({token});

  res.status(200).json({message: 'Logged out'});
}