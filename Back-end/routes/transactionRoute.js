// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const dbConnection = require('../db'); // Assurez-vous que ce chemin est correct

// Route pour ajouter une nouvelle transaction
router.post('/', (req, res) => {
    const { amount, type_income, user_id, description, category_name } = req.body;
    dbConnection.query(
      'INSERT INTO transactions (amount, type_income, user_id, description, category_name) VALUES (?, ?, ?, ?, ?)',
      [amount, type_income, user_id, description, category_name],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Erreur de base de données' });
        }
        res.status(201).json({ message: 'Transaction ajoutée avec succès', id: results.insertId });
      }
    );
});

// Route pour récupérer toutes les transactions d'un utilisateur
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  dbConnection.query('SELECT * FROM transactions WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    res.json(results);
  });
});

module.exports = router;