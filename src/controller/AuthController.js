"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();
const UserModel = require("../model/UserModel");
const { sendMailService, mailTemplate } = require("../services/MailService");

const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET;
const ACTIVATION_EXPIRES = "3d";

exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Lack of Information" });
    }

    const existing = await UserModel.getByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const hashpw = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      fullname,
      email,
      password: hashpw,
      is_active: 0,
    });
    const payload = {
      userId: newUser.insertId,
    };

    const token = jwt.sign({ payload }, ACTIVATION_SECRET, {
      expiresIn: ACTIVATION_EXPIRES,
    });
    const activeLink = `http://localhost:3001/activate-account?token=${token}`;

    sendMailService({
      to: email,
      subject: "Activate Account",
      html: mailTemplate("Click ", activeLink, " to activate account"),
    });

    return res.status(201).json(
      {
        message: "Register Successful. Please check email to activate account.",
      },
      { token: token }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Lack of infomation" });
    }

    const user = await UserModel.getByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email not correct" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "password not correct" });
    }

    const payload = { id: user.id, email: user.email, fullname: user.fullname };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    await UserModel.saveToken(token, user.id);

    return res.json({ message: "Login Successfull", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Token invalid or expired",
      });
    }

    const { userId } = decoded;
    if (!userId) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const user = await UserModel.getById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await UserModel.activateUser(userId);

    return res.status(200).json({
      success: true,
      message: "Account activated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
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
    });
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
        message: "Some problem occured!",
      });
    }

    const currDateTime = new Date();
    const expireAt = new Date(userToken.expire_at);
    if (currDateTime > expireAt) {
      res.status(400).json({
        success: false,
        message: "Reset password link has expired",
      });
    }
    if (userToken.token !== token) {
      res.status(400).json({
        success: false,
        message: "Reset password link is invalid",
      });
    }

    await UserModel.updatePasswordResetToken(id);
    const hashpw = await bcrypt.hash(password, 10);
    await UserModel.updateUserPassword(hashpw, id);
    res.status(200).json({
      success: true,
      message: "Your password reset was successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
