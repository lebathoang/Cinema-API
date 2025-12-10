'use strict';

const UserModel = require('../../../Cinema-API/src/model/UserModel');

exports.profile = async (req, res) => {
    try {
        const user = await UserModel.getById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

exports.list = async (req, res) => {
    try {
        const list = await UserModel.getAll();
        if (list.length == 0) {
            return res.status(404).json({ message: 'List user not found' });
        }
        return res.json({ 'List user': list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};
