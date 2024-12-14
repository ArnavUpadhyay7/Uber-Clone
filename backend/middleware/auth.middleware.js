const blacklisttokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message: 'Unauthorized'});
  }

  const isBlackListed = await blacklisttokenModel.findOne({token});
  if(isBlackListed){
    return res.status(401).json({messaeg: 'Unauthorized'});
  }
  
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  }catch(error){
    return res.status(401).json({message: 'Unauthorized'});
  }
  
};
