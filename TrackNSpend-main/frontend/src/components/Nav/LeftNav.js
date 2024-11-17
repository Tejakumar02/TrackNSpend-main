import React from "react";
import { useNavigate } from "react-router-dom";

const LeftNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="nav">
                <button onClick={() => navigate('/home')}>HOME</button>
                <button onClick={() => navigate('/budget')}>BUDGET</button>
                {/* <button onClick={() => navigate('/goal')}>GOAL</button> */}
            </div>
        </>
    )
}

export default LeftNav;