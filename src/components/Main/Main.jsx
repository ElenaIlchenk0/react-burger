import React, { useEffect } from 'react';
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
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../pages/ProtectedRoute';
import IngredientsDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { getAllIngredients } from '../../services/actions/index';
import { CHECK_USER, getUser } from '../../services/actions/userInfo';

const Main = (props) => {
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch])

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser()).finally(() => dispatch({ type: CHECK_USER }))
        } else {
            dispatch({ type: CHECK_USER })
        }
    }, [])

    const handleModalClose = () => {
        history.goBack();
    };

    return (
        <Layout>
            <Switch location={background || location}>
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
                <Route path="/" exact={true}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </Route>
                <Route path='/ingredients/:ingredientId' exact>
                    <IngredientsDetails />
                </Route>
            </Switch>

            {background && (
                <Route
                    path='/ingredients/:ingredientId'
                    children={
                        <Modal onClose={handleModalClose}>
                            <IngredientsDetails />
                        </Modal>
                    }
                />
            )}

        </Layout>
    )
}

export default Main;
