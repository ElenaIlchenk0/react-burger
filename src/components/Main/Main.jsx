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
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../pages/ProtectedRoute'
import Logout from '../pages/Logout/Logout'

const Main = (props) => {
    return (
        <Layout>
            <Switch>
                <ProtectedRoute onlyUnAuth={true} path="/login" exact={true}>
                    <Login />
                </ProtectedRoute>
                <ProtectedRoute onlyUnAuth={true} path="/register" exact={true}>
                    <Registration />
                </ProtectedRoute>
                <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact={true}>
                    <ForgotPass />
                </ProtectedRoute>
                <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact={true}>
                    <ResetPass />
                </ProtectedRoute>
                <ProtectedRoute path="/profile">
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/" exact={true}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </ProtectedRoute>
                <Route path="/logout" exact={true}>
                    <Logout />
                </Route>
            </Switch>
        </Layout>
    )
}

export default Main;
