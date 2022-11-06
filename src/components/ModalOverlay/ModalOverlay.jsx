import React from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div onClick={props.onClose}
            className={modalOverlayStyles.modalOverlay}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;