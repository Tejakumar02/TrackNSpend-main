import React, { useState } from "react";
import { findCurrentYear } from "../../helpers/common";
import Alert from '../../assets/attention.svg';

const BudgetView = ({ budget }) => {
    const [showBudget, setShowBudget] = useState({});

    const handleClick = (id) => {
        setShowBudget(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    return (
        <>
            {budget && budget.length > 0 ? budget.map((item) => (
                <div className="budget-view" key={item._id}>
                    <div className="header">
                        <h4>{item.month} {findCurrentYear()}</h4>
                    </div>
                    {showBudget[item._id] && (
                        <div className="content">
                            <div>
                                <h4>Budget</h4>
                                <table className="budget-table">
                                    <thead>
                                        <tr>
                                            <th>Salary</th>
                                            <th>Lended Money</th>
                                            <th>Last Month Balance</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.income.map((expense, index) => (
                                            <tr key={index}>
                                                <td>{expense.salary}</td>
                                                <td>{expense.lendedMoney}</td>
                                                <td>{expense.balance}</td>
                                                <td><strong>₹{Number(expense.balance) + Number(expense.lendedMoney) + Number(expense.salary)}</strong></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h4>Expenditure</h4>
                                <table className="expenditure-table">
                                    <thead>
                                        <tr>
                                            <th>Expense Type</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.expenses.map(expense => (
                                            <tr key={expense.id}>
                                                <td>{expense.type}</td>
                                                <td>{expense.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><strong>Total:</strong></td>
                                            <td>
                                                <strong>₹{item.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)}</strong>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}
                    <button onClick={() => handleClick(item._id)}>{showBudget[item._id] ? 'Hide Budget' : 'View Budget'}</button>
                </div>
            )) :
            <div className="no-budgets">
                <img src={Alert} alt="Attention"/>
                <div className="content">
                    <h3>No Budgets to show</h3>
                    <span>Create your own Budget to keep track of it.</span>
                </div>
            </div>
            }
        </>
    )
}

export default BudgetView