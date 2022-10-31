import React from 'react';
import ingredientItemStyles from './IngredientItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class IngredientItem extends React.Component {
    render() {
        return (

            <div className={`${ingredientItemStyles.ingredientsInner} pt-6 pr-4 pl-4 pb-10`}>
                <div className={ingredientItemStyles.ingredintsItem}>
                    <div className={ingredientItemStyles.image}>
                        <img src={this.props.burgerData.image} alt='ingredient img' />

                    </div>
                    <div className={`${ingredientItemStyles.price}`}>
                        <p className={'text text_type_digits-default'}>{this.props.burgerData.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={ingredientItemStyles.title}>{this.props.burgerData.name}</p>
                </div>
            </div>

        )
    }

}

export default IngredientItem;