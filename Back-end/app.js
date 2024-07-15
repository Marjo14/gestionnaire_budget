// Point d'entrée de mon app Node.js + configure express
// Définit les routes et démarre le serveur.

// IMPORTATION MODULES NÉCESSAIRES
const express = require("express"); //
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");



// CHARGER LES VARIABLES ENVRIONNEMENT 
dotenv.config({ path: "./config.env" });

const app = express();


// MIDDLEWARE 
app.use(express.json()); //Analyser le corps des requêtes au format Json
app.use(cors()); 

// MIDDLEWARE POUR LOGER LES REQUETES 
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request URL:", req.originalUrl);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});



// IMPORTER LES ROUTES
const userRoutes = require('./routes/userRoute');
const transactionRoute = require('./route/transactionRoute');

// UTILISATION DES ROUTES

 // Qd on fait requête à /users Express redige la requete vers la route définie: 
app.use('/users', userRoutes);
app.use('/transactions', transactionRoute);

// DÉMARRAGE DU SERVEUR
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});