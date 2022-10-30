import React from 'react';
import mainStyles from './Main.module.css'
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { burgerData } from '../../utils/data.js';

class Main extends React.Component {
    state = {
        activeNavItemId: 0,

    }

    activeNavItemIdHandler = (id) => {
        this.setState(() => ({
            activeNavItemId: id,
        }))
    }

    render() {
        return (
            <Layout
                activeNavItemId={this.state.activeNavItemId}
                onActiveNavItemId={this.activeNavItemIdHandler}
            >
                <BurgerIngredients burgerData={burgerData} />
                <BurgerConstructor burgerData={burgerData} />
            </Layout>
        )
    }

}

export default Main;