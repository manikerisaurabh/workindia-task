const express = require("express");
const cookieParser = require("cookie-parser");

const db = require("./db/connectToDb");
const app = express();

const port = 8080;

const authRoute = require("./routes/auth.route.js");
const trainRoute = require("./routes/train.route.js");
const { authenticateUser } = require("./middlewares/authonticateUser.js");

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

app.use("/api/auth", authRoute);
app.use("/api/train", trainRoute);

app.get("/", authenticateUser, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
