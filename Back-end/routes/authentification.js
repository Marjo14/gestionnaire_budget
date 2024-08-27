const bcrypt = require("bcryptjs"); //Algorithme de hachage MDP
const jwt = require("jsonwebtoken"); //Génération token
const connection = require("./../db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const SALT_ROUNDS = 12; //Combien de fois bcrypt va "mélanger" le MDP ++ sécurité
const JWT_EXPIRES_IN = '1h'; //Durée clé authentification

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: "fail", message: "Tous les champs sont requis." });
  }

  // Ajoutez ici une validation du format de l'email

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    connection.query(query, [name, email, hashedPassword, role || "user"], (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ status: "fail", message: "L'utilisateur existe déjà." });
        }
        return res.status(500).json({ status: "error", message: "Erreur interne du serveur." });
      }

      res.status(201).json({
        status: "success",
        message: "Inscription réussie.",
        data: { id: results.insertId, name, email, role: role || "user" },
      });
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Erreur interne du serveur." });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "fail", message: "Tous les champs sont requis." });
  }

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Erreur interne du serveur." });
      }

      if (results.length === 0) {
        return res.status(401).json({ status: "fail", message: "Identifiants invalides." });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ status: "fail", message: "Identifiants invalides." });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
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
  } catch (err) {
    res.status(500).json({ status: "error", message: "Erreur interne du serveur." });
  }
};

module.exports = { signUp, signIn };