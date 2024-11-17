import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Goal = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, [])

    return (
        <>
           Goal Tracker
        </>
    )
}

export default Goal