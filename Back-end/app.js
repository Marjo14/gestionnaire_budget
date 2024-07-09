const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const router = express.Router();

// chemin de routes vers les dossiers "locaux"
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const transRoutes = require("./routes/transRoutes");

const app = express();

app.use(express.json());
//middleware function provided by the Express framework. It is used to parse incoming request bodies in JSON format

// Middleware pour activer CORS This will allow all cross-origin requests
app.use(cors());

// Middleware to log request headers and add requestTime property
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request URL:", req.originalUrl);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});

// Mounting routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/catalogue", furnitureRoutes);
app.use("/api/v1/canapes", furnitureRoutes);
app.use("/api/v1/chaises", furnitureRoutes);
app.use("/api/v1/tables", furnitureRoutes);
// app.use("/api/v1/canapes/:id", furnitureRoutes); // Example: /api/v1/canapes/:id
app.use("/api/v1/addcart", cartRoutes);


const port = process.env.PORT_SERVER || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});







