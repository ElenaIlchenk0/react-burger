import React, { useEffect } from 'react';
import ReactDOM from "react-dom"
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<IProps> = (props) => {

    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            e.key === "Escape" && props.onClose()
        }

        document.addEventListener('keydown', keyPressHandler)

        return () => {
            document.removeEventListener('keydown', keyPressHandler)
        }
    }, [props])

    const modalsRoot = document.getElementById("modals")!;

    return ReactDOM.createPortal(
        <>
            <div 
                className={modalStyles.modal}
                data-testid='modal'
                >
                <div 
                    onClick={props.onClose} 
                    className={modalStyles.close} 
                    data-testid='closeModal'
                    >
                    <CloseIcon type="primary" />
                </div>
                {props.children}
            </div>
            <ModalOverlay onClose={props.onClose} />
        </>,
        modalsRoot
    );
}

export default Modal;
