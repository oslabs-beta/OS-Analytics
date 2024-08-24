const { Pool } = require('pg');
//This should be put in an .env, right? - Eric 08/23/24
const URI = 'postgresql://postgres.ltmylkgzewtbyzppqgzn:ActivityTracker123!@aws-0-us-west-1.pooler.supabase.com:6543/postgres'

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