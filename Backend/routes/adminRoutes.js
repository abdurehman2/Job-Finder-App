const express = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");
const config = process.env;
const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ user_id: user._id, email }, config.TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      return res.status(200).json({ user, token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});
