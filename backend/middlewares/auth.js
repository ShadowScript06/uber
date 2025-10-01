const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const User = require("../db/models/User.models");
const JWT_SECRET = process.env.JWT_SECRET;
const BlacklistedToken = require("../db/models/BlacklistedToken.model");
const Captain = require("../db/models/Captain.model");
const { response } = require("express");
const userAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Unauthorised",
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Unauthorised",
      });
    }
    const isTokenBlacklisted = await BlacklistedToken.findOne({ token });

    if (isTokenBlacklisted) {
      return res.status(403).json({
        message: "Unauthorised , expired token",
      });
    }
    let userId = "";
    try {
      userId = jwt.verify(token, JWT_SECRET).id;
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorised",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "unauthorised",
      });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const captainAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ 
        message: "Unauthorised",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
   
    if (!token) { 
     
      return res.status(403).json({
        message: "Unauthorised",
      });
    }
    const isTokenBlacklisted = await BlacklistedToken.findOne({ token });

    if (isTokenBlacklisted) {
      return res.status(403).json({ 
        message: "Unauthorised , expired token",
      });
    }

    let captainId = "";
    try {
      captainId = jwt.verify(token, JWT_SECRET).id;
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorised",
      });
      
    }

    const captain = await Captain.findById(captainId);
    if (!captain) {
      return res.status(401).json({
        message: "unauthorised",
      });
    }

    req.captain = captain;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};
module.exports = { userAuth, captainAuth };
