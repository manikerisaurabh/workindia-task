const express = require("express");
const {
  addNewtrainController,
  checkSeatAvailabilityController,
} = require("../controllers/train.controller");
const router = express.Router();

router.post("/add", addNewtrainController);

router.get("/check", checkSeatAvailabilityController);

module.exports = router;
