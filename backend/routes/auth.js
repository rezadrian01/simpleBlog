const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const User = require("../models/user");
const { body } = require("express-validator");

router.post(
  "/login",
  [
    body("email", "Invalid Email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already taken");
          }
        });
      }),
  ],
  authControllers.postSignup
);

module.exports = router;
