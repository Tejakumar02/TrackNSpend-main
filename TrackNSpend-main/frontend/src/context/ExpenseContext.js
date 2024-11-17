import { createContext, useEffect, useReducer } from 'react';
import ToastModal from '../components/ToastModal/ToastModal';

export const ExpenseContext = createContext();

const initialState = {
    expenses: null,
    toast: {
      isVisible: false,
      message: '',
      type: ''
    },
    budget: null
};

export const expensesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            }
        case 'CREATE_EXPENSES':
            return {
                ...state,
                expenses: [action.payload, ...state.expenses]
            }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter((e) => e._id !== action.payload._id)
            }
        case 'UPDATE_EXPENSE':
            const updatedExpenses = state.expenses.map((expense) =>
                expense._id === action.payload._id ? action.payload : expense
            );
            return {
                ...state,
                expenses: updatedExpenses
            }
        case 'SHOW_TOAST':
            return {
                ...state,
                toast: {
                    isVisible: true,
                    message: action.payload.message,
                    type: action.payload.type
                }
            }
        case 'HIDE_TOAST':
            return {
                ...state,
                toast: {
                    isVisible: false,
                    message: '',
                    type: ''
                }
            }
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload
            }
        case 'CREATE_BUDGET':
            return {
                ...state,
                budget: [action.payload, ...state.budget]
            }
        default:
            return state
    }
}

export const ExpenseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expensesReducer, initialState);

    useEffect(() => {
        let timer;
        if(state.toast.isVisible) {
            timer = setTimeout(() => {
                dispatch({type: 'HIDE_TOAST'});
            }, 2000);
        }
        return () => clearTimeout(timer);
    },[state.toast.isVisible]);

    return (
        <ExpenseContext.Provider value={{ ...state, dispatch }}>
            {state.toast.isVisible && (
                <ToastModal
                    message={state.toast.message}
                    hideModal={() => dispatch({ type: 'HIDE_TOAST' })}
                    type={state.toast.type}
                />
            )}
            {children}
        </ExpenseContext.Provider>
    )
}