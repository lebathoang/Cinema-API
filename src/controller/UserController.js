"use strict";

const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require('dotenv').config();

const { sendMailService, mailTemplate } = require("../services/MailService");

exports.profile = async (req, res) => {
  try {
    const user = await UserModel.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    const list = await UserModel.getAll();
    if (list.length == 0) {
      return res.status(404).json({ message: "List user not found" });
    }
    return res.json({ "List user": list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await UserModel.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "oldPassword not correct" });
    }

    const hashpw = await bcrypt.hash(newPassword, 10);

    await UserModel.updateUserPassword(hashpw, user.id);

    return res.json({ message: "Update password successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.sendMail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    await sendMailService({
      to: email,
      subject,
      html: `<h3>${message}</h3>`,
    });

    res.status(200).json({
      success: true,
      message: "Send email successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gửi email thất bại",
      error: err.message,
    });
  }
};

