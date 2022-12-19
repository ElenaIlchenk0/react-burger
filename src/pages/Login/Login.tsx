import React, { useState, useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { loginUser } from '../../services/actions/userInfo';
import { useDispatch } from 'react-redux';
import { THistoryFrom } from '../../types/types';
import { useShowPass } from '../../utils/useShowPass';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const history = useHistory<THistoryFrom>();
    const location = useLocation<THistoryFrom>();

    const [emailValue, setEmail] = useState('')
    const [passwordValue, setPassword] = useState('')

    const { isPassShow, togglePass } = useShowPass(false);

    const inputEmail = useRef<HTMLInputElement>(null)
    const inputPass = useRef<HTMLInputElement>(null)

    const loginHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // @ts-ignore
        dispatch(loginUser({email: emailValue, pass: passwordValue}));
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
                type={isPassShow ? 'text' : 'password'}
                placeholder='Пароль'
                onChange={e => setPassword(e.target.value)}
                value={passwordValue}
                name='password'
                error={false}
                ref={inputPass}
                onIconClick={togglePass}
                errorText='Ошибка'
                size='default'
                icon={isPassShow ? 'HideIcon' : 'ShowIcon'}
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
