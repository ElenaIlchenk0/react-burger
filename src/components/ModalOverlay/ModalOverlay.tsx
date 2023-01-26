import React from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({ onClose }) => {
    return (
        <div 
            onClick={onClose}
            className={modalOverlayStyles.modalOverlay}
            data-testid='overlayClose'
            >
        </div>
    )
}

export default ModalOverlay;
