import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { getIngredients } from '../../utils/burger-api'
import { BurgerDataContext } from '../../services/burgerDataContext'

const Main = (props) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
            .then((data) => setIngredients([...data.data]))
            .catch((err) => console.log(err))
    }, [])

    return (
        <Layout>
            {ingredients.length > 0 && (
                <>
                    <BurgerDataContext.Provider value={{ ingredients }}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </BurgerDataContext.Provider>
                </>
            )}
        </Layout>
    )
}

export default Main;
