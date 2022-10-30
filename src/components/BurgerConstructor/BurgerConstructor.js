import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const burgerDataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string,
    __v: PropTypes.number
}).isRequired;

class BurgerConstructor extends React.Component {

    render() {
        let someBun = this.props.burgerData.find((item) => item.type === 'bun');
        let otherIng = this.props.burgerData.filter((item) => item.type !== 'bun');
        return (

            <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
                <div className={burgerConstructorStyles.menuItemsContainer}>
                    <div className={burgerConstructorStyles.bunsTop}>
                        <div className={burgerConstructorStyles.menuItem}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={someBun.name}
                                price={someBun.price}
                                thumbnail={someBun.image_mobile} />
                        </div>
                    </div>
                    <div className={burgerConstructorStyles.mainIngredients}>
                        {
                            otherIng.map((e, i) =>
                                <div className={burgerConstructorStyles.menuItem} key={i}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={e.name}
                                        price={e.price}
                                        thumbnail={e.image_mobile}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className={burgerConstructorStyles.bunsBottom}>
                        <div className={burgerConstructorStyles.menuItem}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={someBun.name}
                                price={someBun.price}
                                thumbnail={someBun.image_mobile} />
                        </div>

                    </div>
                </div>
            </div>

        )
    }

}

BurgerConstructor.propTypes = {
    burgerData: PropTypes.arrayOf(burgerDataPropTypes),
};

export default BurgerConstructor;