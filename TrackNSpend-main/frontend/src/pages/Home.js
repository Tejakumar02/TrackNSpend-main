import { useEffect, useState } from "react";
import ExpenseViewForm from "../components/ExpenseViewForm/ExpenseViewForm";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useNavigate } from "react-router-dom";
import Collapse from '../assets/dropup.svg';
import Expand from '../assets/dropdown.svg';
import Filter from '../assets/filter.svg';
import Create from '../assets/create.svg';
import Setting from '../assets/settings.svg'
import Alert from '../assets/attention.svg';
import { checkTokenExpiry, sortExpenses } from "../helpers/common";
import PaginatedExpenses from "../components/PaginatedExpenses/PaginatedExpenses";
import Settings from "./Settings";
import Loader from "../components/Loader/Loader";
import MonthlySpendingChart from "../components/Chart/MonthlyExpensesChart";
import CurrentMonthExpenses from "../components/Widgets/CurrentMonthExpenses";
import TotalExpenses from "../components/Widgets/TotalExpenses";
import { getAllExpenses } from "../api";

const Home = () => {
    const {expenses, dispatch} = useExpenseContext();
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }

        const tokenExpired = checkTokenExpiry();

        if (tokenExpired) { 
            navigate('/signin');
        }

        const fetchExpenses = getAllExpenses(dispatch, setIsLoading);
        fetchExpenses();
    }, [dispatch, navigate, token]);

    const expenseForm = () => {
        setShowExpenseForm(prevState => !prevState);
    }

    const setFilter = () => {
        setShowFilter(prevState => !prevState)
    }
    
    const settingsForm = () => {
        setShowSettings(prevState => !prevState)
    }



    return(
        <>
            {isLoading ? <Loader /> :
            <div className='home'>
                <div className="container">
                    <>
                        {expenses && expenses.length > 0 ? <div className="list-expenses">
                            <PaginatedExpenses expenses={sortExpenses(expenses)}/>   
                        </div> :
                        <div className="no-expenses">
                            <img src={Alert} alt="Attention"/>
                            <div className="content">
                                <h3>No Expenses to show</h3>
                                <span>Add your expenses to keep track of it.</span>
                            </div>
                        </div>}
                    </>
                    <div className="widgets">
                        {expenses && <div className="total-expenses-widget">
                            <TotalExpenses expenses={expenses} />
                            <CurrentMonthExpenses expenses={expenses} />
                        </div>}
                        {expenses && expenses.length > 0 && <div className="expenses-container">
                            <div className="header">
                                <div>
                                    <img src={Filter} />
                                    {!showFilter ? <h4>Filter Expenses</h4> : <h4>Filter By Date</h4>}
                                </div>
                                <img onClick={setFilter} src={showFilter ? Collapse : Expand}/>
                            </div>
                            <div className="content">
                                {showFilter && <ExpenseViewForm expense={expenses}/>}
                            </div>
                        </div>}
                        <div className="expenseform-container">
                            <div className="header">
                                <div>
                                    <img src={Create} />
                                    {!showExpenseForm ? <h4>Create a Expense</h4> : <h4>Add Your Expense</h4>}
                                </div>
                                <img onClick={expenseForm} src={showExpenseForm ? Collapse : Expand}/>
                            </div>
                            <div className="content">
                                {showExpenseForm && <ExpenseForm />}
                            </div>
                        </div>
                    </div>
                    <div className="additional-info">
                        <div className="settings-container">
                            <div className="header">
                                <div>
                                    <img src={Setting} />
                                    {!showSettings ? <h4>Account Settings</h4> : <h4>Change Password</h4> }
                                </div>
                                <img onClick={settingsForm} src={showSettings ? Collapse : Expand}/>
                            </div>
                            <div className="content">
                                {showSettings && <Settings />}
                            </div>
                        </div>
                        <>
                            {expenses && expenses.length > 0 && 
                            <>
                                <MonthlySpendingChart expenses={expenses} />
                            </>}
                        </>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default Home;