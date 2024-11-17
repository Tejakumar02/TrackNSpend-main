const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

//Middleware
app.use(cors());
app.use(express.json());

//mock
const fakeUser = {
    userName: 'testuser', 
    password: 'password'
}

const expenses = [
    { id: 1, userId: '1', date: "10/12/2024", place: 'Groceries', amount: 50, createdAt: new Date().toISOString() },
    { id: 1, userId: '1', date: "10/12/2024", place: 'Groceries', amount: 50, createdAt: new Date().toISOString() },
    { id: 1, userId: '1', date: "10/12/2024", place: 'Groceries', amount: 50, createdAt: new Date().toISOString() },
    { id: 1, userId: '1', date: "10/12/2024", place: 'Groceries', amount: 50, createdAt: new Date().toISOString() },
    { id: 1, userId: '1', date: "10/12/2024", place: 'Groceries', amount: 50, createdAt: new Date().toISOString() }
];

const budgets = [
    {id: 1, user: '1', month: "September", expenses: [{"id": 1, "type": "Rent", "amount": 10000}, {"id": 1, "type": "Fuel", "amount": 2000}, {"id": 1, "type": "Others", "amount": 1000}], income: [{"salary": 10000, "lendedMoney": 2000, "balance": 1000}]}
]

//routes
app.post('/api/signin', (req, res) => {
    const { userName, password } = req.body;

    if (userName !== fakeUser.userName) {
        return res.status(400).json({ msg: 'User not found, please enter valid Username' });
    }

    if (password !== fakeUser.password) {
        return res.status(400).json({ msg: 'Wrong Password, please enter valid password' });
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VyX25hbWUiOiJIZW1hbnRoYSBSYWphbiBWIiwicm9sZSI6IkRlc2siLCJleHAiOjU3MDI4ODU5NzB9.58bmUJsAzfdgbXad_OGqj9G2qhwBAtaAtpHPyOiKczs";
    return res.json({token, userName: "", msg: "SignIn Successful" })
});

app.get('/api/expenses', (req, res) => {
    const userId = req.headers.authorization ? '1' : null;

    if (!userId) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    const userExpenses = expenses.filter(expense => expense.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.status(200).json(userExpenses);
})

app.get('/api/budget', (req, res) => {
    const userId = req.headers.authorization ? '1' : null;

    if (!userId) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    const userBudget = budgets.filter(budget => budget.user === userId);
    return res.status(200).json(userBudget)
})

app.listen(PORT, () => {
    console.log(`Fake service running on http://localhost:${PORT}`);
});