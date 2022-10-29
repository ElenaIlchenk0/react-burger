import React from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
import IngredientItem from '../IngredientItem/IngredientItem';


class BurgerIngredients extends React.Component {
    render() {
        const buns = this.props.burgerData.filter((data) => data.type === 'bun');
        const sauces = this.props.burgerData.filter((data) => data.type === 'sauce');
        const main = this.props.burgerData.filter((data) => data.type === 'main');

        return (
            <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
                <h1>Соберите бургер</h1>
                <TabMenu />
                <div className={burgerIngredientsStyles.ingredientsContainer}>
                    <div>
                        <div className={burgerIngredientsStyles.ingredients}>
                            <h2 id='buns'>Булки</h2>
                            {
                                buns.map((item) => <IngredientItem burgerData={item} />)
                            }
                        </div>
                    </div>
                    <div>
                        <div className={burgerIngredientsStyles.ingredients}>
                            <h2 id='sauces'>Соусы</h2>
                            {
                                sauces.map((item) => <IngredientItem burgerData={item} />)
                            }
                        </div>
                    </div>
                    <div>
                        <div className={burgerIngredientsStyles.ingredients}>
                            <h2 id='main'>Начинки</h2>
                            {
                                main.map((item) => <IngredientItem burgerData={item} />)
                            }
                        </div>
                    </div>
                </div>




            </div>
        )
    }

}

export default BurgerIngredients;