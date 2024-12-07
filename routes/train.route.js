const express = require("express");
const {
  addNewtrainController,
  checkSeatAvailabilityController,
  bookNewTrainController,
} = require("../controllers/train.controller");
const router = express.Router();

router.post("/add", addNewtrainController);

router.get("/check", checkSeatAvailabilityController);

router.post("/book", bookNewTrainController);

module.exports = router;
