import React, { useEffect } from 'react';
import ReactDOM from "react-dom"
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {

    useEffect(() => {
        const keyPressHandler = (e) => {
            e.key === "Escape" && props.onClose()
        }

        document.addEventListener('keydown', keyPressHandler)

        return () => {
            document.removeEventListener('keydown', keyPressHandler)
        }
    }, [props.onClose])

    const modalsRoot = document.getElementById("modals");

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.modal}>
                <div onClick={props.onClose} className={modalStyles.close}>
                    <CloseIcon type="primary" />
                </div>
                {props.children}
            </div>
            <ModalOverlay onClose={props.onClose} />
        </>,
        modalsRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Modal;
