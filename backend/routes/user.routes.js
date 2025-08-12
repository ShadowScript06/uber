const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userSignupSchema = require("../validations/userSignup.validation");
const User = require("../db/models/User.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { email } = require("zod");
const userSigninSchema = require("../validations/userSignin.validation");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const {userAuth} = require("../middlewares/auth");
const BlacklistToken = require("../db/models/BlacklistedToken.model");

// SIGN UP ROUTE
router.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    const { success, data } = userSignupSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid Input, Please try again.",
      });
    }
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.status(409).json({
        message: "User Already Exist, Please try again.",
      });
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const newUser = await User.create({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = jwt.sign({ id: newUser._id.toString() }, JWT_SECRET);

      return res.status(200).json({
        message: "User Created Succesfully.",
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error.",
    });
  }
});

// SIGN IN ROUTE
router.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    const { success, data } = userSigninSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid Input, Please try again.",
      });
    }
    const existingUser = await User.findOne({ email: data.email }).select(
      "+password"
    );

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not Exist, Please try Signup.",
      });
    }

    const correctPassword = await bcrypt.compare(
      data.password,
      existingUser.password
    );

    if (!correctPassword) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    console.log(existingUser._id);
    const token = jwt.sign({ id: existingUser._id.toString() }, JWT_SECRET);

    return res.status(200).json({
      message: "User signin Succesfully.",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error.",
    });
  }
});

// GET USER INFO
router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error.",
    });
  }
});

//USER LOGOUT BY BLACKLISTING TOKEN
router.get("/logout", userAuth, async (req, res) => {
  try {
    const token = req.token;
    await BlacklistToken.create({
      token,
    });
    return res.status(200).json({
      message: "User logged out.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
