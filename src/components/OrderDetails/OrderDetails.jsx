import React from "react";
import orderDetailsStyles from './OrderDetails.module.css';
import doneImg from '../../images/done.png';
import PropTypes from 'prop-types';

const OrderDetails = (props) => {
    return (
        <div className={orderDetailsStyles.modalContainer}>
            <p className='text text_type_digits-large'>
                {props.orderNumber > 0 ? 
                    props.orderNumber : 
                    <span className='text text_type_main-medium pt-8'>Секунду...</span>}
            </p>
            <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
            <img className='pt-15 pb-15' src={doneImg} alt='done'></img>
            <p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-medium text_color_inactive pt-2 pb-20'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
};


export default OrderDetails;
