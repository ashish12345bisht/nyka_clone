const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/User");

router.get("/", async (req, res) => {
  res.send("Home page running");
});

router.post("/register", async (req, res) => {
  try {
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new Users({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      res.send("User not found!!");
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (!validate) {
        res.send("Invalid Password!!");
      } else {
        res.send(user);
      }
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
