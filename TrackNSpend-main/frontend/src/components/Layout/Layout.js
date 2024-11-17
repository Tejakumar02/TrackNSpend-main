import React from "react";
import Header from "../Header/Header";
import LeftNav from "../Nav/LeftNav";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="main">
                <div className="left-nav">
                    <LeftNav />
                </div>
                <div className="content-area">
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default Layout;