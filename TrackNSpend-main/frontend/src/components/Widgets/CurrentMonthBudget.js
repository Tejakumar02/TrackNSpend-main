import React from 'react';
import Year from '../../assets/total-money.svg';
import { findCurrentMonth } from '../../helpers/common';

const CurrentMonthBudget = ({ budget }) => {
    return (
        <>
            {budget && <div className='current-month-budget'>
            <img src={Year}/>
                <div>                                    
                    <h3>₹{}</h3>
                    <p>{findCurrentMonth()} Budget </p>
                </div>
            </div>}
        </>
    )
}

export default CurrentMonthBudget;