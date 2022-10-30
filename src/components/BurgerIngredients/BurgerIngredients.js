import React from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
import IngredientItem from '../IngredientItem/IngredientItem';
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

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.refBuns = React.createRef();
        this.refSauces = React.createRef();
        this.refMain = React.createRef();
    }

    handleClickTab = (value) => {
        value === 'buns' ?
            this.refBuns.current.scrollIntoView({ behavior: 'smooth' })
            : value === 'sauces' ?
                this.refSauces.current.scrollIntoView({ behavior: 'smooth' })
                : this.refMain.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const buns = this.props.burgerData.filter((data) => data.type === 'bun');
        const sauces = this.props.burgerData.filter((data) => data.type === 'sauce');
        const main = this.props.burgerData.filter((data) => data.type === 'main');

        return (
            <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
                <h1>Соберите бургер</h1>
                <TabMenu onClickTab={this.handleClickTab} />
                <div className={burgerIngredientsStyles.ingredientsContainer}>
                    <div>
                        <div className={burgerIngredientsStyles.ingredients}>
                            <h2 ref={this.refBuns}>Булки</h2>
                            {
                                buns.map((item) => <IngredientItem burgerData={item} key={item._id} />)
                            }
                        </div>
                    </div>
                    <div>
                        <div className={burgerIngredientsStyles.ingredients}>
                            <h2 ref={this.refSauces}>Соусы</h2>
                            {
                                sauces.map((item) => <IngredientItem burgerData={item} key={item._id} />)
                            }
                        </div>
                    </div>
                    <div>
                        <div className={burgerIngredientsStyles.ingredients}>
                            <h2 ref={this.refMain}>Начинки</h2>
                            {
                                main.map((item) => <IngredientItem burgerData={item} key={item._id} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


BurgerIngredients.propTypes = {
    burgerData: PropTypes.arrayOf(burgerDataPropTypes),
};

export default BurgerIngredients;