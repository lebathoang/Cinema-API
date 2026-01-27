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

  async getListCustomer(search, limit, offset) {
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE fullname LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [`%${search}%`, limit, offset]
    );
    return rows || null;
  },

  async countCustomer(search) {
    const [rows] = await db.execute("SELECT COUNT(*) AS total FROM user WHERE fullname LIKE ?", [
      `%${search}%`,
    ]);
    return rows[0].total;
  },

  async updateUserPassword(id, password) {
    return await db.execute("UPDATE user SET password = ? WHERE id = ?", [password, id]);
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
    const [rows] = await db.execute(
      "SELECT token, expires_at FROM reset_tokens WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      throw new Error("Reset token not found");
    }
    return rows[0];
  },

  async updatePasswordResetToken(id) {
    await db.execute("DELETE FROM reset_tokens WHERE id = ?", [id]);
  },

  async activateUser(id) {
    await db.execute("UPDATE user SET is_active = 1 WHERE id = ?", [id]);
  },

  async getListCustomer(search, limit, offset) {
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE fullname LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [`%${search}%`, limit, offset]
    );
    return rows || null;
  },

  async countCustomer(search) {
    const [rows] = await db.execute("SELECT COUNT(*) AS total FROM user WHERE fullname LIKE ?", [
      `%${search}%`,
    ]);
    return rows[0].total;
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
    const [rows] = await db.execute(
      "SELECT token, expires_at FROM reset_tokens WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      throw new Error("Reset token not found");
    }
    return rows[0];
  },

  async updatePasswordResetToken(id) {
    await db.execute("DELETE FROM reset_tokens WHERE id = ?", [id]);
  },
};

module.exports = UserModel;
