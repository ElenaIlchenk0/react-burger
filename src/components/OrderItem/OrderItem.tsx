import React from 'react';
import orderItemStyles from './OrderItem.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { TModalState } from '../../types/types';

const OrderItem = () => {
    const location = useLocation();
    const { path } = useRouteMatch();

    let someId = 123;

    return (
        <Link<TModalState> 
            className={orderItemStyles.link}
            // key={props.id}
            to={{
                pathname: `${path}/${someId}`,
                state: { background: location },
            }}
            >
            <div className={orderItemStyles.wrapper}>
                <div className={orderItemStyles.headerInfo}>
                    <div className={`${orderItemStyles.orderNumber} text text_type_digits-default`}>
                        #034535
                    </div>
                    <div className={`${orderItemStyles.orderDate} text_color_inactive`}>
                        <FormattedDate date={new Date()} />
                    </div>
                </div>
                <div className={`${orderItemStyles.burgerName} text text_type_main-medium`}>
                    Death Star Starship Main бургер
                </div>
                <div className={orderItemStyles.burgerInfo}>
                    <div className={orderItemStyles.burgerIngredients}>
                        <div className={orderItemStyles.ingImage} style={{zIndex: 10}}>
                            <img src='https://code.s3.yandex.net/react/code/bun-01-mobile.png' alt='ingredient'></img>
                        </div>
                        <div className={orderItemStyles.ingImage} style={{ zIndex: 9 }}>
                            <img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png' alt='ingredient'></img>
                        </div>
                        <div className={orderItemStyles.ingImage} style={{ zIndex: 8 }}>
                            <img src='https://code.s3.yandex.net/react/code/bun-01-mobile.png' alt='ingredient'></img>
                        </div>
                        <div className={orderItemStyles.ingImage} style={{ zIndex: 7 }}>
                            <img src='https://code.s3.yandex.net/react/code/bun-01-mobile.png' alt='ingredient'></img>
                        </div>
                        <div className={orderItemStyles.ingImage} style={{ zIndex: 6 }}>
                            <img src='https://code.s3.yandex.net/react/code/bun-01-mobile.png' alt='ingredient'></img>
                        </div>
                    </div>
                    <div className={orderItemStyles.burgerPrice}>
                        <span className='text text_type_digits-default'>
                            480
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderItem;
