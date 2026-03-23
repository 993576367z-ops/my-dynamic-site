const express = require('express');
const { Pool } = require('pg'); // PostgreSQL
require('dotenv').config();

const app = express();
app.use(express.static('public'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.get('/time', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Current server time: ${result.rows[0].now}`);
    } catch (err) {
        res.status(500).send('Database error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
