import React from "react";
import Year from '../../assets/total-money.svg';
import { totalExpenses } from "../../helpers/common";

const TotalExpenses = ({ expenses }) => {
    return (
        <>
            {expenses && <div className="total-expenses">
                <img src={Year}/>
                <div>                                    
                    <h3>₹{totalExpenses(expenses)}</h3>
                    <p>Total Expenses</p>
                </div>
            </div>}
        </>
    )
}

export default TotalExpenses;