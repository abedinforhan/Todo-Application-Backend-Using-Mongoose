const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

//schemas
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

//sign up user

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is here the salt round

    const user = {
      name,
      username,
      password: hashedPassword,
    };
    console.log(user);
    const newUser = new User(user);
    const data = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Signup Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup Failed ! Please try again.",
    });
  }
});

//login user

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = { username };

    const user = await User.find(query);
    const { name, password: hashedPassword } = user[0];

    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(password, hashedPassword);

      if (isValidPassword) {
        //generating token
        const token = jwt.sign(
          { name, username },
          `${process.env.JWT_SECRET}`,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "Login successful !",
        });
      } else {
        res.status(401).json({
          success: false,
          error: "Authentication Failed !",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        error: "Authentication failed!",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Authentication failed!",
    });
  }
});
module.exports = router;
