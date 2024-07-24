const dependentDao = require('../dao/dependent_dao');
const Dependent = require('../models/user_dependent_model.js');
const uuid = require('uuid');

exports.getDependents = async (req, res) => {
    try {
        const dependents = await dependentDao.getDependents();
        if(!dependents) {
            res.status(404).send('Dependents not found');
        }
        res.status(200).send(dependents);
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.createDependent = async (req, res) => {
    const {name, age, password, username,userId } = req.body;
    try {
        const dependentModel = new Dependent({
            id:uuid.v4(),
            name,
            age,
            password,
            username,
            userId
        });
        const dependent = await dependentDao.createDependent(dependentModel);
        return res.status(201).send(dependent);
    } catch (error) {
        console.log(error)
        return  res.status(500).send
    }
}