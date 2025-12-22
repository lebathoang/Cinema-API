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

  async getAll() {
    const [list] = await db.execute("SELECT * FROM user");
    return list || null;
  },

  async updateUserPassword(id, password) {
    db.execute("UPDATE user SET password = ? WHERE id = ?", [password, id]);
  },

  async updateForgotPasswordToken(id, token) {
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 60 + 60 + 24 * 1000).toISOString();
    await db.execute(
      "INSERT INTO reset_tokens (token, created_at, expires_at, id) VALUES (?, ?, ?, ?)",
      [token, createdAt, expiresAt, id]
    );
  },

  async getPasswordResetToken(id) {
    const [rows] = await db.execute("SELECT token, expires_at FROM reset_tokens WHERE id = ?", [id]);
    return rows[0];
  },

  async updatePasswordResetToken(id) {
    await db.execute("DELETE FROM reset_tokens WHERE id = ?", [id]);  
  }
};

module.exports = UserModel;
