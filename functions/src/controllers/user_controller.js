const userDao = require('../dao/user_dao');
const User = require('../models/user_model');
const uuid = require('uuid');
exports.getUsers = async (req, res) => {
  try {
    const users = await userDao.getUsers();
    if(!users) {
      res.status(404).send('Users not found');
    }
    res.status(200).send(users);

  } catch (error) {
    res.status(500).send(error);
    }
}

exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userModel = new User({
            id:uuid.v4(),
            name,
            email,
            password
        });
        console.log(userModel,'..............')
        const user = await userDao.createUser(userModel);
        return res.status(201).send(user);
    } catch (error) {
      return  res.status(500).send
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userDao.deleteUser(id);
        if(!user) {
            res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    try {
        const userModel = new User({
            id,
            name,
            email,
            password
        });
        const user = await userDao.createUser(userModel);
        return res.status(201).send(user);
    } catch (error) {
        return  res.status(500).send
    }
}