import React, { useState, useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { loginUser } from '../../services/actions/userInfo';
import { useDispatch } from 'react-redux';

const Login = (props) => {
    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();

    const [emailValue, setEmail] = useState('')
    const [passwordValue, setPassword] = useState('')
    const inputEmail = useRef(null)
    const inputPass = useRef(null)

    const showPass = () => {
        setTimeout(() => inputPass.current.focus(), 0)
        alert('Icon Click Callback showPass')
    }

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(emailValue, passwordValue));
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
    }


    return (
        <form onSubmit={loginHandler} className={formStyles.formWrapper}>
            <h2>Вход</h2>
            <Input
                type='email'
                placeholder='E-mail'
                onChange={e => setEmail(e.target.value)}
                value={emailValue}
                name='email'
                error={false}
                ref={inputEmail}
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
                <Button type="primary" size="small" htmlType="submit" >
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
        </form>

    )
}

export default Login;
