// Route pour ajouter une nouvelle transaction

const router = require("./routes/userRoutes");


app.post('/transactions', (req, res) => {
    const { amount, type_income, user_id, description, category_name } = req.body;
    connection.query(
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
app.get('/transactions/:userId', (req, res) => {
  const userId = req.params.userId;
  connection.query('SELECT * FROM transactions WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    res.json(results);
  });
});

module.exports = router;