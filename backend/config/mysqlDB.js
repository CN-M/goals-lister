const mysql = require('mysql2');
const {
  HOST, USER, DATABASE, PASS,
} = process.env;

const db = mysql.createConnection({
  host: HOST,
  user: 'root',
  password: PASS,
  database: DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQSL Database Connected'.magenta.underline);
});

module.exports = db;
