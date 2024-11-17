import React from 'react';
import Month from '../../assets/total-month.svg'
import { findCurrentMonthExpenses, findCurrentMonth } from '../../helpers/common';

const CurrentMonthExpenses = ({ expenses }) => {
    return (
        <>
            {expenses && <div className="current-month-expenses">
                <img src={Month}/>
                <div>
                    <h3>₹{findCurrentMonthExpenses(expenses)}</h3>
                    <p>{findCurrentMonth()} Expenses </p>
                </div>
            </div>}
        </>
    )
}

export default CurrentMonthExpenses;