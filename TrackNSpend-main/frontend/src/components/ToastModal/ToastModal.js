import Close from '../../assets/ic-close.svg'

const ToastModal = ({ message, hideModal, type }) => {
    return (
        <>
            <div className={type}>
                <p>{message}</p>
                <img src={Close} alt='close' onClick={hideModal}/>
            </div>
        </>
    )
}

export default ToastModal;