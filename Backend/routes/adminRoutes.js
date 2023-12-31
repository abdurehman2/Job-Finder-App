const express = require("express");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middlewares/adminAuth");
const config = process.env;
const router = express.Router();

//Create User
router.post("/register/user", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      contact,
      location,
      profileURL,
      cvURL,
      jobTitle,
      about,
      status,
      role,
      accountType,
    } = req.body;
    if (!email && !password && !username) {
      res.status(400).json("All input is required");
    }
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(409).json("User Already Exist. Please Login");
    }
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      role: role,
      contact: contact,
      location: location,
      profileURL: profileURL,
      cvURL: cvURL,
      jobTitle: jobTitle,
      about: about,
      status: status,
      accountType: accountType,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
  }
});

// Create Company Profile
router.post("/register/company", async (req, res) => {
  try {
    const { name, email, password, contact, location, about, profileURL } =
      req.body;
    if (!email && !password && !name) {
      res.status(400).json("All input is required");
    }
    const oldUser = await Company.findOne({ name });
    if (oldUser) {
      return res.status(409).json("User Already Exist. Please Login");
    }
    const user = await Company.create({
      name: name,
      email: email,
      password: password,
      contact: contact,
      location: location,
      profileURL: profileURL,
      about: about,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
  }
});

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
      const token = jwt.sign(
        { user_id: user._id, email },
        config.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      user.token = token;
      return res.status(200).json({ user, token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// View all users
router.get("/users", auth, async (req, res) => {
  const admin = await User.findById(req.user.user_id);
  try {
    if (admin) {
      const users = await User.find();
      const userArray = users.filter(
        (user) =>
          //   (user.accountType == "seeker" || user.accountType == "Seeker") &&
          user.role != "admin" && user.accountType === "Seeker"
      );
      res.json(userArray);
    } else {
      res.status(403).json({ message: "Only admin can access this route" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// View all companies
router.get("/company", auth, async (req, res) => {
  const admin = await User.findById(req.user.user_id);
  try {
    if (admin) {
      const users = await Company.find();
      const userArray = users.filter(
        (user) =>
          //   (user.accountType == "seeker" || user.accountType == "Seeker") &&
          user.role != "admin" && user.accountType === "Company"
      );
      res.json(userArray);
    } else {
      res.status(403).json({ message: "Only admin can access this route" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Update a User
router.put("/users/:id", auth, async (req, res) => {
  const admin = await User.findById(req.user.user_id);
  try {
    if (admin) {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        role,
        contact,
        location,
        profileURL,
        cvURL,
        jobTitle,
        about,
        status,
        accountType,
      } = req.body;
      try {
        const user = await User.findByIdAndUpdate(
          id,
          {
            firstName,
            lastName,
            username,
            email,
            password,
            role,
            contact,
            location,
            profileURL,
            cvURL,
            jobTitle,
            about,
            status,
            accountType,
          },
          { new: true }
        );
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } else {
      res.status(403).json({ message: "Only admin can access this route" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Block a user
router.put("/users/:userId/block", auth, async (req, res) => {
  const admin = await User.findById(req.user.user_id);
  try {
    // Check if the logged-in user is an admin
    if (!admin) {
      return res
        .status(403)
        .json({ message: "Only admin can access this route" });
    }

    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role == "admin") {
      return res.status(404).json({ message: "Cannot block other admin" });
    }

    // Update the user's status to 'blocked'
    user.status = "Blocked";
    await user.save();

    res.json({ message: "User blocked successfully", blockedUser: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Unblock a user
router.put("/users/:userId/unblock", auth, async (req, res) => {
  const admin = await User.findById(req.user.user_id);
  try {
    // Check if the logged-in user is an admin
    if (!admin) {
      return res
        .status(403)
        .json({ message: "Only admin can access this route" });
    }

    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role == "admin") {
      return res.status(404).json({ message: "Cannot block other admin" });
    }

    // Update the user's status to 'blocked'
    user.status = "Active";
    await user.save();

    res.json({ message: "User unblocked successfully", unblockedUser: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
