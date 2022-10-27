import React from 'react';
import mainStyles from './Main.module.css'
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

class Main extends React.Component {
    render() {
        return (
            <Layout>
                {/* <BurgerConstructor />
                <BurgerIngredients /> */}
            </Layout>

        )
    }

}

export default Main;