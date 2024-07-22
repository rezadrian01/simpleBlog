const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const User = require("../models/user");
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("email", "Invalid Email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email has been taken!");
          }
        });
      }),
    body("password", "Invalid Password!").trim().isLength({ min: 3 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to be same!");
      }
      return true;
    }),
    body("username", "Invalid Username")
      .trim()
      .isLength({ min: 2 })
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((user) => {
          if (user) {
            return Promise.reject("Username has been taken!");
          }
        });
      }),
  ],
  authControllers.postSignup
);

router.post(
  "/login",
  [
    body("email", "Invalid Email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            req.statusCode = 404;
            return Promise.reject("User not found!");
          }
        });
      }),
    body("password", "Invalid Password").trim().isLength({ min: 3 }),
  ],
  authControllers.postLogin
);

module.exports = router;
