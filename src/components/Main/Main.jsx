import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { getIngredients } from '../../utils/burger-api'


const Main = (props) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
            .then((data) => setIngredients([...data.data]))
            .catch((err) => Promise.reject(err))
    }, [])

    return (
        <Layout>
            {ingredients.length && (
                <>
                    <BurgerIngredients burgerData={ingredients} />
                    <BurgerConstructor burgerData={ingredients} />
                </>
            )}
        </Layout>
    )
}

export default Main;