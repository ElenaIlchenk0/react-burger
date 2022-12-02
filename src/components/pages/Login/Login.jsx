import React, { useState, useRef, useEffect } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../../services/actions/userInfo';
import { useDispatch, useSelector } from 'react-redux';

const Login = (props) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(store => store.setUserReducer);

    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) history.replace('/')
    })

    const [emailValue, setEmail] = useState('')
    const [passwordValue, setPassword] = useState('')
    const inputEmail = useRef(null)
    const inputPass = useRef(null)

    const onIconClick = () => {
        setTimeout(() => inputEmail.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const showPass = () => {
        setTimeout(() => inputPass.current.focus(), 0)
        alert('Icon Click Callback showPass')
    }

    const loginHandler = () => {
        dispatch(loginUser(emailValue, passwordValue));
    }

    return (
        <div className={formStyles.formWrapper}>
            <h2>Вход</h2>
            <Input
                type='email'
                placeholder='E-mail'
                onChange={e => setEmail(e.target.value)}
                value={emailValue}
                name='email'
                error={false}
                ref={inputEmail}
                onIconClick={onIconClick}
                errorText='Ошибка'
                size='default'
            />
            <Input
                type='password'
                placeholder='Пароль'
                onChange={e => setPassword(e.target.value)}
                value={passwordValue}
                name='password'
                error={false}
                ref={inputPass}
                onIconClick={showPass}
                errorText='Ошибка'
                size='default'
                icon='ShowIcon'
            />
            <div className='mb-20'>
                <Button type="primary" size="small" htmlType="button" onClick={loginHandler}>
                    Войти
                </Button>
            </div>
            <div>
                <p className='text text_type_main-default text_color_inactive mb-4'>
                    Вы — новый пользователь? <Link to='/register' className={formStyles.link}>Зарегистрироваться</Link>
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    Забыли пароль? <Link to='/forgot-password' className={formStyles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
        
    )
}

export default Login;
