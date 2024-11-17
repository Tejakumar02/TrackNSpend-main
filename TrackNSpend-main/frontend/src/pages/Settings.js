import React, { useState } from "react";
import axios from 'axios';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { isValidPassword, validatePassword, isNotNull } from "../helpers/common";

const Settings = () => {
    const { dispatch } = useExpenseContext();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userName = sessionStorage.getItem('name');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!handleSave()) {
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/change_password`, { userName, oldPassword, newPassword });

            if (response.status === 200) {
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: `${response.data.msg}`,
                        type: 'success'
                    }
                });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        }
        catch(err) {
            if(err.response && err.response.status === 400) {
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: `${err.response.data.msg}`,
                        type: 'error'
                    }
                });
            }
            else {
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: {
                        message: `Network Error`,
                        type: 'error'
                    }
                });
            }
        }
    }

    const handleSave = () => {
        let valid = true;
        const isValid = isNotNull(oldPassword);
        const validPassword = isValidPassword(newPassword);
        const paswordMismatch = validatePassword(newPassword, confirmPassword);

        if(isValid) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: `Old Password is required`,
                    type: 'error'
                }
            });
            valid = false;
            return;
        }

        if (validPassword) {
            dispatch({
                type: 'SHOW_TOAST',
                payload: {
                    message: `Password should have atleast 8 characters`,
                    type: 'error'
                }
            });
            setNewPassword('');
            setConfirmPassword('');
            valid = false;
            return;
        }
        if (paswordMismatch) {
        dispatch({
            type: 'SHOW_TOAST',
            payload: {
                message: `Password mismatch, enter same passwords in both fields`,
                type: 'error'
            }
        });
          setConfirmPassword('');
          valid = false;
          return;
        }
        return valid;
      }

    return (
        <>
            <div className="settings">
                <div className="change-password">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Enter old Password</label>
                            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>Enter new Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>Confirm  Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                            <button onClick={handleSave}>Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Settings;