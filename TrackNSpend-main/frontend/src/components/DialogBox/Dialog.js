import React from "react";

const Dialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="dialog">
                <div className="content">
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>
                <div className="buttons">
                    <button onClick={onConfirm}>CONFIRM</button>
                    <button onClick={onCancel}>CANCEL</button>
                </div>
            </div>
        </div>
    )

}

export default Dialog;