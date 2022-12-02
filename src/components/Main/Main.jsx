import React from 'react';
import Layout from '../Layout/Layout'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import ForgotPass from '../pages/ForgotPass/ForgotPass';
import ResetPass from '../pages/ResetPass/ResetPass';
import Profile from '../pages/Profile/Profile';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Main = (props) => {

    return (
        <Layout>
            <Switch>
                <Route path="/login" exact={true}>
                    <Login />
                </Route>
                <Route path="/register" exact={true}>
                    <Registration />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPass />
                </Route>
                <Route path="/reset-password" exact={true}>
                    <ResetPass />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/" exact={true}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </Route>
            </Switch>
        </Layout>
    )
}

export default Main;
