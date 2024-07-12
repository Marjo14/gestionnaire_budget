// Configurer la connexion à la base de donnée

// dbConfig.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Configurer la connexion MySQL
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT // Utiliser le port de la DB depuis le fichier .env
});

// Connexion à la base de données
dbConnectionconnection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});


module.exports = dbConnection;
