"use strict";

const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = "secret";
const JWT_EXPIRES_IN = "1d";

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
    console.log(hashpw);

    const newUser = await UserModel.create({
      fullname,
      email,
      password: hashpw,
    });

    return res
      .status(201)
      .json({ message: "Register Successful", user: newUser });
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

