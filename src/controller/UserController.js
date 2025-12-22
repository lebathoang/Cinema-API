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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Email not exist" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    await UserModel.updateForgotPasswordToken(user.id, resetToken);

    const mailOptions = {
      to: email,
      subject: "Forgot Password Link",
      html: mailTemplate(
        "We have received a request to reset your password. Please reset your password using the link below.",
        `${process.env.FRONTEND_URL}/resetPassword?id=${user.id}&token=${resetToken}`,
        "Reset Password"
      ),
    };
    await sendMailService(mailOptions);
    res.status(200).json({
      success: true,
      message: "A password reset link has been sent to your email.",
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, token, id } = req.body;
    const userToken = await UserModel.getPasswordResetToken(id);
    if (!userToken || userToken.length === 0) {
      res.json({
        success: false,
        message: "Some problem occured!"
      })
    }

    const currDateTime = new Date();
    const expireAt = new Date(userToken.expire_at);
    if (currDateTime > expireAt) {
      res.status(400).json({
        success: false,
        message: "Reset password link has expired",
      })
    }
    if (userToken.token !== token) {
      res.status(400).json({
        success: false,
        message: "Reset password link is invalid",
      })
    }

    await UserModel.updatePasswordResetToken(id);
    const hashpw = await bcrypt.hash(password, 10);
    await UserModel.updateUserPassword(hashpw, id);
    res.status(200).json({
      success: true,
      message: "Your password reset was successfully",
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: "Server error"});
  }
}