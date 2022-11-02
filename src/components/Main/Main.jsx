import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

const url = 'https://norma.nomoreparties.space/api/ingredients';

const Main = (props) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setIngredients([...data.data]))
            .catch((err) => console.log(err))
    }, [])

    return (
        <Layout>
            <BurgerIngredients burgerData={ingredients} />
            <BurgerConstructor burgerData={ingredients} />
        </Layout>
    )
}

export default Main;