import React, { useState, useRef, useEffect } from 'react';
import profileStyles from './Profile.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, patchUser } from '../../../services/actions/userInfo';
import { logoutUser } from '../../../services/actions/userInfo'

const Profile = (props) => {

    const dispatch = useDispatch();
    const { email, name, pass } = useSelector(store => store.setUserReducer.user);
    const { user } = useSelector(store => store.setUserReducer);

    const history = useHistory();

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
    const passRef = useRef(null);

    const onIconClick = () => {
        nameRef.current.value = setName('');
        nameRef.current.focus()
    }
    const onIconClickMail = () => {
        emailRef.current.value = setEmail('');
        emailRef.current.focus()
    }
    const onIconClickPass = () => {
        passRef.current.value = setPassword('');
        passRef.current.focus()
    }

    const onBlurHandler = (e) => {
        if (e.target.value === '') {
            e.target.name === 'name' && setName(name)
            e.target.name === 'email' && setEmail(email)
            e.target.name === 'pass' && setPassword(pass)
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(patchUser(userName, userEmail, passwordValue))
    }

    const onDeclineChanges = (e) => {
        e.preventDefault();
        setName(name);
        setEmail(email);
        setPassword(pass);
    }

    const logoutHandler = () => {
        dispatch(logoutUser())
    };

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
                    <div
                        className='text text_type_main-medium text_color_inactive'
                        style={{ cursor: "pointer" }}
                        onClick={logoutHandler}
                    >
                        <span>Выход</span>
                    </div>
                </nav>
                <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <form className={profileStyles.form}>
                <Input
                    type='text'
                    placeholder='Имя'
                    onChange={e => setName(e.target.value)}
                    onBlur={e => onBlurHandler(e)}
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
                    onBlur={e => onBlurHandler(e)}
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
                    onBlur={e => onBlurHandler(e)}
                    value={passwordValue}
                    name='pass'
                    error={false}
                    ref={passRef}
                    onIconClick={onIconClickPass}
                    errorText='Ошибка'
                    size='default'
                    icon='EditIcon'
                />
                <div className={profileStyles.buttons}>
                    <button className={`${profileStyles.buttonLink} text text_type_main-small`} onClick={onDeclineChanges}>Отмена</button>
                    <Button type="primary" size="medium" htmlType="button" onClick={onSubmitHandler}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default Profile;
