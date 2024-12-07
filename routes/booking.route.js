const express = require("express");
const {
  getBookingDetailsController,
} = require("../controllers/booking.controller.js");
const router = express.Router();

router.get("/info/:bookingId", getBookingDetailsController);

module.exports = router;
