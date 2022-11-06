import React, { useEffect } from 'react';
import ReactDOM from "react-dom"
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import closeImg from '../../images/close.png';
import PropTypes from 'prop-types';
import {MODALS_ID} from '../../utils/constants'

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
                <h1 className={modalStyles.header}>{props.header}</h1>
                <div onClick={props.onClose} className={modalStyles.close}>
                    <img src={closeImg} alt='close'></img>
                </div>
                {props.children}
            </div>
            <ModalOverlay onClose={props.onClose} />
        </>,
        modalsRoot
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;