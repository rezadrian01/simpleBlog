const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

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
    res
      .status(201)
      .json({
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

const errTemplate = (
  msg = "An error occured!",
  statusCode = 500,
  data = []
) => {
  const err = new Error(msg);
  err.statusCode = statusCode;
  err.data = data;
  throw err;
};
