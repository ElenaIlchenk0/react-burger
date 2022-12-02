import React, { useState, useRef, useEffect } from 'react';
import formStyles from '../form.module.css';
import profileStyles from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, patchUser } from '../../../services/actions/userInfo'

const ForgotPass = (props) => {

    const dispatch = useDispatch();
    const { email, name, pass } = useSelector(store => store.setUserReducer)

    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [passwordValue, setPassword] = useState('');

    useEffect(() => {
        dispatch(getUser());
    }, [])

    useEffect(() => setName(name), [name]);
    useEffect(() => setEmail(email), [email]);
    useEffect(() => setPassword(pass), [pass]);


    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const inputPass = useRef(null);


    const onIconClick = () => {
        setTimeout(() => nameRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const onIconClickMail = () => {
        setTimeout(() => emailRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const onIconClickPass = () => {
        setTimeout(() => inputPass.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(patchUser(userName, userEmail, passwordValue))
    }

    const onDeclineChanges = () => {
        console.log('onDeclineChanges')
    }

    return (
        <div className={profileStyles.profileWrapper}>
            <div className={profileStyles.sideMenu}>
                <nav className={profileStyles.nav}>
                    <NavLink
                        to='/profile'
                        className='text text_type_main-medium text_color_inactive'
                        activeClassName={profileStyles.activeNav}
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to='/profile/orders'
                        className='text text_type_main-medium text_color_inactive'
                        activeClassName={profileStyles.activeNav}
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        to='/logout'
                        className='text text_type_main-medium text_color_inactive'
                        activeClassName={profileStyles.activeNav}
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <form onSubmit={onSubmitHandler} className={profileStyles.form}>
                <Input
                    type='text'
                    placeholder='Имя'
                    onChange={e => setName(e.target.value)}
                    icon={'EditIcon'}
                    value={userName}
                    name='name'
                    error={false}
                    ref={nameRef}
                    onIconClick={onIconClick}
                    errorText='Ошибка'
                    size='default'
                />
                <Input
                    type='email'
                    placeholder='Логин'
                    onChange={e => setEmail(e.target.value)}
                    icon='EditIcon'
                    value={userEmail}
                    name='email'
                    error={false}
                    ref={emailRef}
                    onIconClick={onIconClickMail}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    onChange={e => setPassword(e.target.value)}
                    value={passwordValue}
                    name='password'
                    error={false}
                    ref={inputPass}
                    onIconClick={onIconClickPass}
                    errorText='Ошибка'
                    size='default'
                    icon='EditIcon'
                />
                <div>
                    <button onClick={onDeclineChanges}>Отмена</button>
                    <Button type="primary" size="small" htmlType="button" onClick={onSubmitHandler}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default ForgotPass;
