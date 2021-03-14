const Pool = require('pg').Pool;

const db = new Pool({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

module.exports = db;
