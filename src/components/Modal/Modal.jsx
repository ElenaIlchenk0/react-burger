import React, { useEffect } from 'react';
import ReactDOM from "react-dom"
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import closeImg from '../../images/close.png';
import PropTypes from 'prop-types';

const Modal = (props) => {
    const keyPressHandler = React.useCallback((e) => {
        e.key === "Escape" && props.onClose()
    }, [props])

    useEffect(() => {
        document.addEventListener('keydown', keyPressHandler)

        return () => {
            document.removeEventListener('keydown', keyPressHandler)
        }
    }, [keyPressHandler])

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.modal}>
                <h1 className={modalStyles.header}>{props.header}</h1>
                <div onClick={props.onClose} className={modalStyles.close}>
                    <img src={closeImg} alt='close'></img>
                </div>
                {props.children}
            </div>
            <ModalOverlay onClose={props.onClose} />
        </>,
        document.getElementById("modals")
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;