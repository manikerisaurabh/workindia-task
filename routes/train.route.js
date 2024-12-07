const express = require("express");
const { addNewtrainController } = require("../controllers/train.controller");
const router = express.Router();

router.post("/add", addNewtrainController);

router.get("/check");

module.exports = router;
