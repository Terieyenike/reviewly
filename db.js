const Pool = require('pg').Pool;

const db = new Pool({
  port: 5432,
  host: 'localhost',
  user: 'teyenike',
  password: '',
  database: 'reviewly',
});

module.exports = db;
