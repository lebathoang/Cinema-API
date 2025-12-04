'use strict';

const users = require('../model/registerModel');

exports.getUsers = (req, res) => {
  users.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  })
}

exports.getUser = (req, res) => {
  const id = req.params.id;
  users.getById(id, (err, result) => {
    if(err) throw err;
    res.json(result[0]);
  })
}

exports.createUser = (req, res) => {
  const data = req.body;

  users.create(data, (err, result) => {
    if(err) throw err;

    res.json({
      message: "Them user thanh cong",
      data: {id: result.insertId, ...data}
    })
  })
}

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  users.update(id, data, (err) => {
    if(err) throw err;
    res.json({
      message: "Cap nhat thanh cong",
      data: {id, ...data},
    })
  })
}

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  users.delete(id, (err) => {
    if(err) throw err;
    res.json({message: "Xoa du lieu thanh cong"})
  })
}