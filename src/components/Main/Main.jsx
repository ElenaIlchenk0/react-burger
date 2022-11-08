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
            .catch((err) => Promise.reject(err))
    }, [])

    return (
        <Layout>
            {ingredients.length > 0 && (
                <>
                    <BurgerIngredients burgerData={ingredients} />
                    <BurgerDataContext.Provider value={{ ingredients }}>
                        <BurgerConstructor />
                    </BurgerDataContext.Provider>
                </>
            )}
        </Layout>
    )
}

export default Main;