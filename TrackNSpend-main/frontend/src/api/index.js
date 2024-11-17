import axios from "axios";

const token = sessionStorage.getItem('token');

export const getAllExpenses = (dispatch, setIsLoading) => {
    return async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_APPLICATION_URL}/api/expenses`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                const result = await response.data
                dispatch({type:'SET_EXPENSES', payload: result})
            }
        }
        catch(err) {
            console.error("Error while fetching the data", err);
        }
        finally {
            setIsLoading(false);
        }
    }
}

export const getAllBudgets = (dispatch, setIsLoading) => {
    return async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_APPLICATION_URL}/api/budget`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                const result = await response.data;
                dispatch({type:'SET_BUDGET', payload: result})
            }
        }
        catch (err) {
            console.error("Error while fetching the data", err);
        }
        finally {
            setIsLoading(false);
        }
    }
} 