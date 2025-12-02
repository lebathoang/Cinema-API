'use strict';

const db = require('../../config/db.config');

const users = {
  getAll: callback => {
    db.query("SELECT * FROM user", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO user (fullname, email, password) VALUES (?, ?, ?)", [data.fullname, data.email, data.password], callback)
  },
  update: (id, data, callback) => {
    db.query("UPDATE user SET fullname=?, email=?, password=? WHERE id=?", [data.fullname, data.email, data.password, id], callback)
  },
  delete: (id, callback) => {
    db.query("DELETE FROM user WHERE id = ?", [id], callback);
  }
}

module.exports = users;