import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../prop-types'

class BurgerConstructor extends React.Component {

    render() {
        const someBun = this.props.burgerData.find((item) => item.type === 'bun');
        const otherIng = this.props.burgerData.filter((item) => item.type !== 'bun');
        return (

            <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
                <div className={burgerConstructorStyles.menuItemsContainer}>
                    <div className={burgerConstructorStyles.bunsTop}>
                        <div className={burgerConstructorStyles.menuItem}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${someBun.name} (верх)`}
                                price={someBun.price}
                                thumbnail={someBun.image_mobile} />
                        </div>
                    </div>
                    <div className={burgerConstructorStyles.mainIngredients}>
                        {
                            otherIng.map((ingredient, index) =>
                                <div className={burgerConstructorStyles.menuItem} key={index}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image_mobile}
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
                                text={`${someBun.name} (низ)`}
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
    burgerData: PropTypes.arrayOf(burgerDataPropTypes).isRequired,
};

export default BurgerConstructor;