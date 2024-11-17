const express = require('express')
const { createExpense, getAllExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController')
const { signUp, signIn, authMiddleware, updatePassword } = require('../controllers/authenticationController');
const { createBudget, getBudgets } = require('../controllers/budgetController');

const router = express.Router()

router.get('/expenses', authMiddleware, getAllExpenses)

router.post('/', authMiddleware, createExpense)

router.delete('/:id', deleteExpense)

router.patch('/:id', updateExpense)

router.post('/signup', signUp)

router.post('/signin', signIn)

router.post('/change_password', updatePassword)

router.post('/create_budget', authMiddleware, createBudget)

router.get('/budget', authMiddleware, getBudgets)

module.exports = router
