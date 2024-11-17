import React, { useState } from "react";
import axios from "axios";
import { useExpenseContext } from "../../hooks/useExpenseContext";
import Delete from "../../assets/ic-delete.svg";
import Edit from "../../assets/edit.svg"
import Place from "../../assets/place.svg"
import Date from "../../assets/date.svg"
import Amount from "../../assets/amount.svg"
import { formatDate } from "../../helpers/common";
import Dialog from "../DialogBox/Dialog";

const ExpenseDetails = ({expense}) => {
    const { dispatch } = useExpenseContext();
    const [showDialog, setShowDialog] = useState(false);
    const [showEditOption, setShowEditOption] = useState(false);
    const [editedExpense, setEditedExpense] = useState({...expense})
    const [showConfirmModal, setShowConfirmModal] = useState({
        title: '',
        message: '',
        onConfirm: () => {},
        onCancel: () => {}
    })

    //Delete Expense
    const handleDeleteConfirm = async () => {
        setShowDialog(false);
        const response = await axios.delete(`${process.env.REACT_APP_APPLICATION_URL}/api/${expense._id}`)

        if(response.status === 200) {
            const result = await response.data
            dispatch({type:'DELETE_EXPENSE', payload: result})
            dispatch({
                type:'SHOW_TOAST',
                payload: {
                    message: 'Expense has been deleted',
                    type: 'success'
                }
            })
        }
    }

    //Show Delete Modal (Confirmation) 
    const showDeleteModal = () => {
        setShowDialog(true);
        setShowConfirmModal({
            title: "Delete Expense",
            message: "Are you sure, do you want to delete this expense?",
            onConfirm: handleDeleteConfirm,
            onCancel: hideDeleteModal
        });
    }

    //Hide Delete Modal (Cancellation) 
    const hideDeleteModal = () => {
        setShowDialog(false);
    }

    //Update Expense
    const handleSave = async () => {
        setShowEditOption(false);
        setShowDialog(false);
        const response = await axios.patch(`${process.env.REACT_APP_APPLICATION_URL}/api/${expense._id}`, {
            date: editedExpense.date,
            place: editedExpense.place,
            amount: editedExpense.amount
        })

        if(response.status === 200) {
            const result = await response.data
            dispatch({type:'UPDATE_EXPENSE', payload: result});
            dispatch({
                type:'SHOW_TOAST',
                payload: {
                    message: 'Expense has been updated',
                    type: 'success'
                }
            })
        }
    }

    //Display update filed
    const displayEditField = () => {
        setShowEditOption(true);
    }

    //Hide update field
    const hideEditField = () => {
        setShowEditOption(false)
        setShowDialog(false)
    }

    //Update changed fields in the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense({...editedExpense, [name]: value})
    }

    const showEditModal = () =>{
        setShowDialog(true);
        setShowConfirmModal({
            title: "Update Expense",
            message: "Are you sure, do you want to update this expense?",
            onConfirm: handleSave,
            onCancel: hideEditField
        });
    }

    return(
        <div className="expense-container">
            <div className="expense">
                <div className="expense-details">
                    <div className="section">
                        {showEditOption && <img src={Place}/>}
                        {showEditOption ? <input type="text" name="place" value={editedExpense.place} onChange={handleChange} /> : <h4>{expense.place}</h4>}
                    </div>
                    <div className="section">
                        {showEditOption && <img src={Date}/>}
                        {showEditOption ? <input type="date" name="date" value={editedExpense.date} onChange={handleChange} /> : <p><strong>Date: </strong>{formatDate(expense.date)}</p>}
                    </div>
                    <div className="section">
                        {showEditOption && <img src={Amount}/>}
                        {showEditOption ? <input type="number" name="amount" value={editedExpense.amount} onChange={handleChange} /> : <p><strong>Amount: </strong>{expense.amount}</p>}
                    </div>                
                </div>
                <div className="modify-expense">
                    <img src={Edit} onClick={displayEditField}/>
                    <img src={Delete} onClick={showDeleteModal} />
                </div>
            </div>
            {showEditOption && <div className="save-expense">
                <button onClick={showEditModal}>Save</button>
                <button onClick={hideEditField}>Cancel</button>
            </div>}

            <Dialog 
                isOpen={showDialog}
                title={showConfirmModal.title}
                message={showConfirmModal.message}
                onConfirm={showConfirmModal.onConfirm}
                onCancel={showConfirmModal.onCancel}
            />
        </div>    
    )
}

export default ExpenseDetails;