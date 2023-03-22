const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { networkInterfaces } = require('os');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for students in the endpoint '/api/students'
app.get('/api/students', cors(), async (req, res) => {
    try {
        const { rows: students } = await db.query('SELECT * FROM students');
        res.send(students);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request
app.post('/api/students', cors(), async (req, res) => {
    const newStudent = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        iscurrent: req.body.iscurrent
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
        'INSERT INTO students(firstname, lastname, is_current) VALUES($1, $2, $3) RETURNING *',
        [newStudent.firstname, newStudent.lastname, newStudent.iscurrent],
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});