// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const dbConnection = require('../db'); 

// Route pour ajouter une nouvelle transaction
router.post('/create', (req, res) => {
    const { amount, type_income, user_id, description, category_name } = req.body;
    console.log(type_income);
    dbConnection.query(
      'INSERT INTO transactions (amount, type_income, user_id, description, category_name) VALUES (?, ?, ?, ?, ?)',    
    [amount, type_income, user_id, description, category_name],
      (error, results) => {
        if (error) { 
          console.log(error);
          return res.status(500).json({ error: 'Erreur 500' });
        }
        res.status(201).json({ message: 'Transaction ajoutée avec succès', id: results.insertId });
      }
    );
});

// Route pour récupérer toutes les transactions d'un utilisateur
router.get('/get/:userId', (req, res) => {
  const userId = req.params.userId;
  dbConnection.query('SELECT * FROM transactions WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    res.json(results);
  });
});

// Route pour mettre à jour une transaction
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { amount, type_income, description, category_name } = req.body;

  dbConnection.query(
    'UPDATE transactions SET amount=?, type_income=?, description=?, category_name=? WHERE id=?',
    [amount, type_income, description, category_name, id],
    (error, results) => {
      if (error) { 
        console.error(error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Transaction non trouvée' });
      }
      res.status(200).json({ message: 'Transaction mise à jour avec succès' });
    }
  );
});

module.exports = router;