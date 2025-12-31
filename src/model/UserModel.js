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
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    return rows[0] || null;
  },

  async getById(id) {
    const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async activateUser(id) {
    await db.execute("UPDATE user SET is_active = 1 WHERE id = ?", [id]);
  },
};

module.exports = UserModel;
