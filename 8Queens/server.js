const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Choose a port for your server

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dsa_games',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Endpoint to store player data
app.post('/storeQueenMoves', (req, res) => {
    const playerName = req.body.playerName;
    const moves = req.body.moves;

    if (!playerName || !moves) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Use a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting a MySQL connection:', err);
            res.status(500).json({ message: 'Database connection error' });
            return;
        }

        const insertQuery = 'INSERT INTO eight_queens (playerName, moves) VALUES (?, ?)';
        const values = [playerName, JSON.stringify(moves)];

        // Insert player data into the database
        connection.query(insertQuery, values, (insertErr, result) => {
            // Release the connection back to the pool
            connection.release();

            if (insertErr) {
                console.error('Error inserting data into MySQL:', insertErr);
                res.status(500).json({ message: 'Database insertion error' });
                return;
            }

            console.log('Player data inserted:', result.insertId);
            res.json({ message: 'Data stored successfully' });
        });
    });
});

// Endpoint to get stored player data
app.get('/getQueenMoves', (req, res) => {
    
    // Use a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting a MySQL connection:', err);
            res.status(500).json({ message: 'Database connection error' });
            return;
        }

        const selectQuery = 'SELECT playerName, moves FROM eight_queens';
        
        // Retrieve player data from the database
        connection.query(selectQuery, (selectErr, result) => {
            // Release the connection back to the pool
            connection.release();

            if (selectErr) {
                console.error('Cannot select data from Database:', selectErr);
                res.status(500).json({ message: 'Database selection error' });
                return;
            }

            // Send the player data as JSON response
            res.json({ players: result });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});