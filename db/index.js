require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: 'strikethurmatron_dev',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

module.exports = {
  async query(text, params) {
    const result = await pool.query(text, params)
      .catch(err => Promise.reject(err));
    return result;
  }
};
