// routes/calculationRoute.js

const express = require('express');
const router = express.Router();
const dbConnection = require('../db');
const Transactions = require('../db');

//Calcul soustraction nouveau solde INCOME
router.get('/balance/:userId',(req, res) => {
    const userId = req.params.userId; //Info récup du front 
    const query = `
    SELECT SUM (amount) as income 
    FROM transactions
    WHERE user_id = ?`
});


// Calcul du solde total pour un utilisateur
router.get('/balance/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT 
        SUM(CASE WHEN type_income = 'income' THEN amount ELSE -amount END) as balance
      FROM transactions 
      WHERE user_id = ?
    `;
    
    dbConnection.query(query, [userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      res.json({ balance: results[0].balance || 0 });
    });
  });
  
  // Calcul par catégorie pour un utilisateur
  router.get('/category-summary/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT category_name, 
             SUM(CASE WHEN type_income = 'income' THEN amount ELSE 0 END) as totalIncome,
             SUM(CASE WHEN type_income = 'expense' THEN amount ELSE 0 END) as totalExpense
      FROM transactions 
      WHERE user_id = ?
      GROUP BY category_name
    `;
    
    dbConnection.query(query, [userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      res.json(results);
    });
  });
  
  module.exports = router;
