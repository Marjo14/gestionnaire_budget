const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("./../db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  const token = require("crypto").randomBytes(64).toString("hex");
  console.log(token);
  process.env.JWT_SECRET = token;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const query =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [name, email, hashedPassword, role || "user"],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ status: "fail", message: "Email already exists." });
          }
          return res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        }

        res.status(201).json({
          status: "success",
          message: "User signed up successfully",
          data: { id: results.insertId, name, email, role: role || "user" },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const signIn = (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "All fields are required." });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid email or password." });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

module.exports = { signUp, signIn };
