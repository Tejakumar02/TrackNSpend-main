import React, { useState, useMemo } from 'react';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';

const PaginatedExpenses = ({ expenses }) => {
    const [displayCount, setDisplayCount] = useState(7);
    const displayedExpenses = useMemo(() => expenses.slice(0, displayCount), [expenses, displayCount]);

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 7);
    };

    const handleShowLess = () => {
        setDisplayCount(prevCount => prevCount - 7);
    }

    return (
        <div>
            {displayedExpenses.map((expense) => (
                <ExpenseDetails key={expense._id} expense={expense} />
            ))}
            <div className='show-buttons'>
                {displayCount < expenses.length && (
                    <button onClick={handleShowMore}>Show More</button>
                )}
                {displayCount >= 8 && (
                    <button onClick={handleShowLess}>Show Less</button>
                )}
            </div>
        </div>
    );
};

export default PaginatedExpenses;
