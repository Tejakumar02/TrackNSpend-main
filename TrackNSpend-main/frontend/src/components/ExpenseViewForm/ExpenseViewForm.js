import React, { useState } from 'react';
import { filterExpenses } from '../../helpers/common'
import { useExpenseContext } from '../../hooks/useExpenseContext';

const ExpenseViewForm = ({ expense }) => {
    const {dispatch} = useExpenseContext(); 
    const [fromDate, setFromDate] = useState('')
    const [toDate, SetToDate] = useState('');
    const [originalExpenses] = useState(expense);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateInputFields(fromDate, toDate)) {
            return;
        }

        const condition = { fromDate, toDate };
        const filtered = filterExpenses(expense, condition);
        dispatch({type:'SET_EXPENSES', payload: filtered});
        dispatch({
            type: 'SHOW_TOAST',
            payload: {
                message: `Filter has been applied`,
                type: 'success'
            }
        });
    };

    const handleReset = () => {
        setFromDate('');
        SetToDate('');
        dispatch({ type: 'SET_EXPENSES', payload: originalExpenses });
        dispatch({
            type: 'SHOW_TOAST',
            payload: {
                message: `Filter has been removed`,
                type: 'success'
            }
        });
    };

    const validateInputFields = (fromDate, toDate) => {
        let valid = true;
        if (!fromDate || !toDate) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: `Please enter the dates`,
                    type: 'error'
                }
            });
            valid = false;
            return;
        }
        return valid;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='FROM' value={fromDate} onChange={(e) => setFromDate(e.target.value)} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    <input type='text' placeholder='TO' value={toDate} onChange={(e) => SetToDate(e.target.value)} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                </div>
                <div>
                    <button type="submit">View</button>
                    <button type="button" onClick={handleReset}>Clear</button>
                </div>
            </form>
        </>
    )
}

export default ExpenseViewForm