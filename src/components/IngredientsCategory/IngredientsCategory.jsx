import React from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import IngredientItem from '../IngredientItem/IngredientItem';
import PropTypes from 'prop-types';

const IngredientsCategory = (props) => {
    return (
        <div className={ingredientsCategoryStyles.ingredients}>
            <h2 ref={props.refItem}>{props.category}</h2>
            {
                props.data.map((item) =>
                    <IngredientItem
                        burgerData={item}
                        key={item._id}
                        onOpenModal={props.onOpenModal} />)
            }
        </div>
    )
}

IngredientsCategory.propTypes = {
    refItem: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired,
    category: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
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
    }).isRequired).isRequired
};

export default IngredientsCategory
