"use strict";

const db = require("../../config/db.config");

const UserModel = {
  async create({ fullname, email, password }) {
    const [result] = await db.execute(
      "INSERT INTO user (fullname, email, password) VALUES(?, ?, ?)",
      [fullname, email, password]
    );
    return result;
  },

  async getByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [email]);
    return rows[0] || null;
  },

  async getById(id) {
    const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async getAll() {
    const [list] = await db.execute("SELECT * FROM user");
    return list || null;
  },
  async apdatePassword(id, password) {
    db.execute("UPDATE user SET password = ? WHERE id = ?", [password, id]);
  }
};

module.exports = UserModel;
