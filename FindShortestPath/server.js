const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;                              // Assign port 3000 to run the server

app.use(bodyParser.json());

app.use(express.static('public'));              // Serve static files from the 'public' directory

// Configure the MySQL Database
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dsa_games'
}

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Endpoint to store player results
app.post('/storeLocations', (req, res) => {
    const playerName = req.body.playerName;
    const locations = req.body.locations;

    if (!playerName || !locations) {
        return res.status(400).json({ error: 'Invalid Data' });
    }

    // Use a conncetion from the pool
    pool.getConnection((err, connection)=>{
        if(err){
            console.error('Cannot connect to the Database',err);
            res.status(500).json({message: 'Database Connection Error'});
            return;
        }

        const insertQuery = 'INSERT INTO shortest_path (playerName, locations) VALUES (?, ?)';
        const values = [playerName, JSON.stringify(locations)];

        // Insert player name and the locations into database
        connection.query(insertQuery, values, (insertErr,result)=>{
            // Release the connection back to the pool
            connection.release();

            if(insertErr){
                console.error('Cannot insert data into database:', insertErr);
                res.status(500).json({message: 'Database insertion error'});
                return;
            }

            console.log('Player data inserted:', result.insertId);
            res.json({message:'Data insert successfully'});
        });
    });
});

// Start the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});