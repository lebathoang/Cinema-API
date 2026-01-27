"use strict";
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../model/UserModel");
const { sendMailService, mailTemplate } = require("../services/MailService");

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
      email,
      type: "activate_account",
    };

    const token = jwt.sign({ payload }, process.env.ACTIVATION_SECRET, {
      expiresIn: process.env.ACTIVATION_EXPRIES,
    });
    const activeLink = `http://localhost:3001/activate-account?token=${token}`;

    sendMailService({
      to: email,
      subject: "Activate Account",
      html: mailTemplate("Click ", activeLink, " to activate account"),
    });

    return res.status(201).json({
      message: "Register Successful. Please check email to activate account.",
      token,
    });
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

    if (user.is_active === 0) {
      return res.status(403).json({
        message: "Account is not activated",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "password not correct" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      is_active: user.is_active,
    };
    const token = jwt.sign(payload, process.env.ACTIVATION_SECRET, {
      expiresIn: process.env.ACTIVATION_EXPIRES,
    });

    return res.json({ message: "Login Successfull", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Token invalid or expired",
      });
    }

    const userId = decoded.payload.userId;
    if (!userId) {
      return res.status(400).json({ message: "Invalid userid payload" });
    }
    const user = await UserModel.getById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.is_active === 1) {
      return res.status(400).json({
        success: false,
        message: "Account has already been activated",
      });
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

exports.resendActivation = async (req, res) => {
  try {
    const { resendEmail } = req.body;

    if (!resendEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.getByEmail(resendEmail);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_active === 1) {
      return res.status(409).json({
        code: "already_activated",
        message: "Account already activated",
      });
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const token = jwt.sign({ payload }, process.env.ACTIVATION_SECRET, {
      expiresIn: process.env.ACTIVATION_EXPRIES,
    });

    const activeLink = `http://localhost:3001/activate-account?token=${token}`;

    await sendMailService({
      to: resendEmail,
      subject: "Activate Account",
      html: mailTemplate("Click ", activeLink, " to activate your account"),
    });

    return res.status(200).json({
      success: true,
      message: "Activation link has been sent to your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.getByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "Email not exist" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    await UserModel.updateForgotPasswordToken(user.id, resetToken);

    const activeLink = `http://localhost:3001/reset-password?id=${user.id}&token=${resetToken}`;

    const mailOptions = {
      to: email,
      subject: "Forgot Password Link",
      html: mailTemplate(
        "We have received a request to reset your password. Please reset your password using the link below.",
        activeLink,
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
    if (!userToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset request",
      });
    }

    if (new Date() > new Date(userToken.expire_at)) {
      return res.status(400).json({
        success: false,
        message: "Reset password link has expired",
      });
    }

    if (userToken.token !== token) {
      return res.status(400).json({
        success: false,
        message: "Reset password link is invalid",
      });
    }

    const hashpw = await bcrypt.hash(password, 10);
    await UserModel.updateUserPassword(id, hashpw);
    await UserModel.updatePasswordResetToken(id);
    res.status(200).json({
      success: true,
      message: "Your password reset was successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
