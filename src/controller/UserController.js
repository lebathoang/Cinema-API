"use strict";

const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
require('dotenv').config();

const { sendMailService } = require("../services/MailService");

exports.profile = async (req, res) => {
  try {
    const id = req.params.id;
    
    const customer = await UserModel.getById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      })
    }
    const { password, email, ...safeCustomer } = customer;

    return res.status(200).json({
      success: true,
      message: "Get profile successfully",
      data: safeCustomer,
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.listCustomer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const listCustomer = await UserModel.getListCustomer(search, limit, offset);
    const total = await UserModel.countCustomer(search);

    if (listCustomer.length == 0) {
      return res.status(404).json({ message: "List user not found" });
    }

    return res.json({ 
      success: true,
      data: listCustomer,
      pagination: {
        total,
        page,
        limit,
      }
     });
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

