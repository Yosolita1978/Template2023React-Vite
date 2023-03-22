const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
// const db = require('./db/db-connection.js');
// const { networkInterfaces } = require('os');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
  res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
  });