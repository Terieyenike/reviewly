const Pool = require('pg').Pool;

const db = new Pool({
  connectString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
