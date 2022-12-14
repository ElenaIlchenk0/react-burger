import React from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({ onClose }) => {
    return (
        <div onClick={onClose}
            className={modalOverlayStyles.modalOverlay}>
        </div>
    )
}

export default ModalOverlay;
