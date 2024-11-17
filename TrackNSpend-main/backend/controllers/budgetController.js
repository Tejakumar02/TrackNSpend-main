const Budget = require('../models/budgetModel');
const mongoose = require('mongoose');

//Create a new Budget
const createBudget = async(req, res) => {
    const {month, expenses, income} = req.body;
    const user = req.user.id;
    try {
        const budget = await Budget.create({month, expenses, income, user});
        res.status(200).json(budget);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

const getBudgets = async(req, res) => {
    try {
        const user = req.user.id;
        const budget = await Budget.find({ user })
        res.status(200).json(budget);
    }
    catch (err) {
        res.status(404).json({err: err.message});
    }
}

module.exports = {
    createBudget,
    getBudgets
}