const {
  signUpController,
  loginController,
} = require("../controllers/auth.controller.js");

const express = require("express");
const router = express.Router();

router.post("/sign-up", signUpController);

router.post("/log-in", loginController);

module.exports = router;
