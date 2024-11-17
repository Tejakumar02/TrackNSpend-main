import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BudgetIcon from '../assets/budget.svg'
import BudgetForm from "../components/Budget/BudgetForm";
import BudgetView from '../components/Budget/BudgetView'
import Collapse from '../assets/dropup.svg';
import Expand from '../assets/dropdown.svg';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { getAllExpenses, getAllBudgets } from '../api';
import Loader from '../components/Loader/Loader';
import CurrentMonthExpenses from '../components/Widgets/CurrentMonthExpenses';
import CurrentMonthBudget from '../components/Widgets/CurrentMonthBudget';

const Budget = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [showBudgetForm, setShowBudgetForm] = useState(false);
    const { expenses, budget, dispatch } = useExpenseContext();
    const [isLoading, setIsLoading] = useState(false);

    const budgetForm = () => {
        setShowBudgetForm(prevState => !prevState)
    }

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
        const fetchExpenses = getAllExpenses(dispatch, setIsLoading);
        fetchExpenses();
        const fetchBudget = getAllBudgets(dispatch, setIsLoading);
        fetchBudget();
    }, [token])

    return (
        <>
        {isLoading ? <Loader /> :
            <div className="budget">
                <div className="budgetform-container">
                    <div className="header">
                        <div>
                            <img src={BudgetIcon} />
                            <h4>Create a Budget</h4>
                        </div>
                        <img onClick={budgetForm} src={showBudgetForm ? Collapse : Expand}/>
                    </div>
                    {showBudgetForm && <div className="content">
                        <BudgetForm />
                    </div>}
                </div>
                <div className="budgetview-container">
                    <BudgetView budget={budget} />
                </div>
                <div className='widgets'>
                    <CurrentMonthExpenses expenses={expenses} />
                    <CurrentMonthBudget budget={budget} />
                </div>
            </div>}
        </>
    )
}

export default Budget