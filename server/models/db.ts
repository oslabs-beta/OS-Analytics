const { Pool } = require('pg');

const URI = process.env.DB_URI_STRING

const pool = new Pool({
    connectionString: URI,
});
const checkDatabaseConnection = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Connected to the PostgreSQL database.');
    } catch (err) {
        console.error('Failed to connect to the PostgreSQL database:', err);
    }
  };

export {pool, checkDatabaseConnection};