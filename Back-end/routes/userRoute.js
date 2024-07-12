
const express = require('express');
const router = express.Router();

// Route pour récupérer tous les utilisateurs

router.get('/', (req, res) => {
    connection.query('SELECT * FROM user', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      res.json(results);
    });
  });

  module.exports =router;