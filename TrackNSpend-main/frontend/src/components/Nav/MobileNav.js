import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../assets/menu.svg";
import { removeToken } from "../../helpers/common";

const MobileNav = ({ showNav }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/signin');
    }

    const handleClick = () => {
        showNav(prevState => !prevState);
    }

    const navHome = () => {
        showNav(prevState => !prevState);
        navigate('/home')
    }

    const navBudget = () => {
        showNav(prevState => !prevState);
        navigate('/budget')
    }

    return (
        <>
            <div className="nav">
                <img src={Menu} onClick={handleClick} />

                <div className="buttons">
                    <div>
                    <button onClick={navHome}>HOME</button>
                    <button onClick={navBudget}>BUDGET</button>
                    {/* <button onClick={() => navigate('/goal')}>GOAL</button> */}
                    </div>
                    <button onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>
        </>
    )
}

export default MobileNav;