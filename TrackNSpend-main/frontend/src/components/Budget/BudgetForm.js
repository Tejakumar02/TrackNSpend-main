import React, { useState } from "react";
import { useExpenseContext } from "../../hooks/useExpenseContext";
import Delete from '../../assets/ic-delete.svg';
import { totalExpenses } from "../../helpers/common";
import axios from "axios";

const BudgetForm = () => {
    const { dispatch } = useExpenseContext();
    const [salary, setSalary] = useState('');
    const [balance, setBalance] = useState('');
    const [lendedMoney, setLendedMoney] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [id, setId] = useState(1);
    const [month, setMonth] = useState('');
    const token = sessionStorage.getItem('token');

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const addExpenseField = () => {
        if (!month || !salary || !balance || !lendedMoney) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: 'All Fields are required',
                    type: 'error'
                }
            })
            return
        }
        setExpenses([...expenses, { id: id, type: '', amount: '' }]);
        setId(id + 1);
    };

    const handleLabelChange = (id, e) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === id ? { ...expense, type: e.target.value } : expense
        );
        setExpenses(updatedExpenses);
    };

    const handleValueChange = (id, e) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === id ? { ...expense, amount: e.target.value } : expense
        );
        setExpenses(updatedExpenses);
    };

    const deleteRow = (id) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
    };

    const createBudget = async (e) => {
        e.preventDefault();

        if ( !month || !salary || !balance || !lendedMoney ) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: 'All fields are required',
                    type: 'error'
                }
            })
            return;
        }
        if (expenses.length === 0) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: 'Please add at least one expense',
                    type: 'error'
                }
            });
            return;
        }
        const invalidExpenses = expenses.some(expense => !expense.type || !expense.amount);
        if (invalidExpenses) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: 'All expenses must have both type and amount',
                    type: 'error'
                }
            });
            return;
        }
        const total = totalExpenses(expenses);
        const income = {balance, lendedMoney, salary, total}
        const budget = { month, expenses, income };

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/create_budget`, budget, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                const result = await response.data;
                dispatch({type: 'CREATE_BUDGET', payload: result});
                setSalary('');
                setLendedMoney('');
                setBalance('');
                setMonth('');
                setId(1);
                setExpenses([]);
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: 'Budget added successfully',
                        type: 'success'
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const balanceAmount = (expenses, salary, lendedMoney, balance) => {
        const remaining = (Number(salary) + Number(lendedMoney) + Number(balance)) - totalExpenses(expenses);
        return remaining;
    }

    return (
        <div className="budget-form">
            <div>
                <label>Select Month: </label>
                <select 
                        name="select-expense-type" 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                >
                    <option value="">Select</option>
                    {months.map(month => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Last Month Balance: </label>
                <input 
                    type="number"
                    min="0"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />
            </div>
            <div>
                <label>Enter Salary: </label>
                <input
                    type="number"
                    min="0"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
            </div>
            <div>
                <label>Lended Money: </label>
                <input 
                    type="number"
                    min="0"
                    value={lendedMoney}
                    onChange={(e) => setLendedMoney(e.target.value)}
                />
            </div>
            {expenses && expenses.length > 0 && <div className="budget-expense-list">
                {expenses.map(expense => (
                    <div key={expense.id} className="budget-expense-container">
                        <input
                            type="text"
                            value={expense.type}
                            onChange={(e) => handleLabelChange(expense.id, e)}
                            placeholder="Expense Type"
                        />
                        <input
                            type="text"
                            value={expense.value}
                            onChange={(e) => handleValueChange(expense.id, e)}
                            placeholder="Enter Expense"
                        />
                        <img 
                            src={Delete}
                            alt="Delete"
                            onClick={() => deleteRow(expense.id)}
                        />
                    </div>
                ))}
            </div>}
            <div className="buttons">
                <button onClick={addExpenseField}>Add Expense</button>
                {expenses && expenses.length > 0 && <button onClick={createBudget}>Create new Budget</button>}
            </div>
            <div className="total-balance">
                <h2 className="total">
                    Expenditure: <br />
                    <span>₹{totalExpenses(expenses)}</span>
                </h2>
                <h2 className="balance">
                    Balance Budget: <br />
                    <span>₹{balanceAmount(expenses, salary, lendedMoney, balance)}</span>
                </h2>
            </div>
        </div>
    );
};

export default BudgetForm;
