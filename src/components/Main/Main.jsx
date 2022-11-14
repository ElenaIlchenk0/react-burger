import React from 'react';
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


const Main = (props) => {

    return (
        <Layout>
            <BurgerIngredients />
            <BurgerConstructor />
        </Layout>
    )
}

export default Main;
