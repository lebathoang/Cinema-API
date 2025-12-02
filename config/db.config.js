'use strict';

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cinema'
})

db.connect(function(err) {
  if (err) {
    console.log("Ket noi that bai", err);
  }else {
    console.log("Ket noi thanh cong");
  }
});

module.exports = db;