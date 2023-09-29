const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// MySQL database configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eightqueens',
});

db.connect((error) => {
    if (error) {
        console.error('Cannot connect to the MySQL Database:', error);
        return;
    }
    console.log('Connected to the MySQL Database');
});

function insertMove(x, y, callback) {
    const query = 'INSERT INTO queens_moves (x,y) VALUES (?,?)';
    db.query(query, [x, y], (error, results) => {
        if (error) {
            console.error('Error inserting move into MySQL:', error);
        } else {
            console.log('Move inserted into MySQL');
        }
        callback(error);
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    insertMove,
};