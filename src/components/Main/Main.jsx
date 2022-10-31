import React from 'react';
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { burgerData } from '../../utils/data.js';

class Main extends React.Component {

    render() {
        return (
            <Layout>
                <BurgerIngredients burgerData={burgerData} />
                <BurgerConstructor burgerData={burgerData} />
            </Layout>
        )
    }

}

export default Main;