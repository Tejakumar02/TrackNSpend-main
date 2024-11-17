import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { removeToken } from "../../helpers/common";
import Menu from "../../assets/menu.svg";
import MobileNav from "../Nav/MobileNav";

const Header = () => {
    const navigate = useNavigate();
    const name = sessionStorage.getItem('name');
    const [showNav, setShowNav] = useState(false);

    const handleLogout = () => {
        removeToken();
        navigate('/signin');
    }
    
    const handleClick = () => {
        setShowNav(prevState => !prevState);
    }

    return (
        <>
            <header>
                <div className="container">
                    <div>
                        <img className="menu" src={Menu} onClick={handleClick}/>
                        <h2>Welcome {name}!</h2>
                    </div>
                    <button onClick={handleLogout}>LOGOUT</button>
                </div>
            </header>
            {showNav && <div className="mobile-nav">
                <MobileNav showNav={setShowNav}/>
            </div>}
        </>
    )
}

export default Header;