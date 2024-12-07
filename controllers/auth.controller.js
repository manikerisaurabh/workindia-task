const db = require("../db/connectToDb.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user, expiry) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
};

const signUpController = async (req, res) => {
  const isEmailPresentQuery = `SELECT u.* FROM users u WHERE u.email = $1`;
  const addNewUserQuery = `INSERT INTO users (email, password, role) VALUES($1, $2, $3)`;

  try {
    const { email, password, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const isEmailPresent = await db.query(isEmailPresentQuery, [email]);

    if (isEmailPresent.rowCount > 0) {
      return res.status(409).json({ message: "Email is already present" });
    }

    const newUser = await db.query(addNewUserQuery, [
      email,
      hashedPassword,
      role,
    ]);
    const user = newUser.rows[0];
    const accessMaxAge = 60 * 60 * 1000;
    const accessToken = generateAccessToken(user, accessMaxAge);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: accessMaxAge,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Error in signUpController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  const checkUserQuery = `SELECT u.*
                            FROM users u
                            WHERE u.email= $1`;
  const { email, password } = req.body;
  console.log(req.body);
  console.log(req.cookies.token);
  try {
    const isUserPresent = await db.query(checkUserQuery, [email]);

    if (isUserPresent.rowCount == 0) {
      return res.status(401).json({ message: "user not found" });
    }

    const user = isUserPresent.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log({ user });
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessMaxAge = 60 * 60 * 1000;
    const accessToken = generateAccessToken(user, accessMaxAge);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: accessMaxAge,
    });

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log("error in loginController : ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signUpController,
  loginController,
};
