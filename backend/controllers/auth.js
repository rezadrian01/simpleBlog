const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const { errTemplate } = require("../utils/error.js");

const { validationResult } = require("express-validator");

exports.postSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errTemplate("Validation Failed!", 422, errors.array());
    } //user input
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPw,
      username,
    });
    const createdUser = await user.save();
    res.status(201).json({
      message: "Success creating account!",
      userId: createdUser._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errTemplate("Validation failed!", req.statusCode || 422, errors.array());
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      errTemplate("Wrong password", 401);
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "5hr" }
    );
    res
      .status(200)
      .json({ message: "Login success", token, userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
