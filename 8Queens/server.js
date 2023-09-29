const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
// Choose port 3000 to run the server
const port = 3000;

app.use(bodyParser.json());

// Serve all the files in Public Folder
app.use(express.static('public'));

// MySQL Database Configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eightqueens'
};

// Create MySQL Connection pool
const pool = mysql.createPool(dbConfig);

// Endpoint to store player data
app.post('/storeQueensPlacements', (req, res) => {
    const playerName = req.body.playerName;
    const queenPlacement = req.body.queenPlacement; // Expect a single queen placement object

    if (!playerName || !queenPlacement) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Use a connection from the pool
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting a MySQL Connection:', error);
            res.status(500).json({ message: 'Database Connection Error' });
            return;
        }

        const insertQuery = 'INSERT INTO queens_moves (playerName, x, y) VALUES (?, ?, ?)';

        // Insert Queens Locations into the database
        queenPlacement.forEach((placement) => {
            const values = [playerName, placement.x, placement.y];

            connection.query(insertQuery, values, (insertError, result) => {
                if (insertError) {
                    console.error('Error inserting data into MySQL database:', insertError);
                } else {
                    console.log('Queens Locations inserted', result.insertId);
                }
            });
        });

        // Release the connection back to the pool
        connection.release();
        res.json({ message: 'Queens Locations stored successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

