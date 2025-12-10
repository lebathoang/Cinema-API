'use strict';

const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'cinema',
})

module.exports = db;