import React, { useState, useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useShowPass } from '../../utils/useShowPass';

const Registration: React.FC = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { isError, errMsg } = useSelector(store => store.setUserReducer);

    const [nameValue, setName] = useState('');
    const [emailValue, setEmail] = useState('');
    const [passwordValue, setPassword] = useState('');

    const { isPassShow, togglePass } = useShowPass(false);

    const inputName = useRef<HTMLInputElement>(null)
    const inputPass = useRef<HTMLInputElement>(null)

    const registrationHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(registerUser({email: emailValue, pass: passwordValue, name: nameValue}));
    }

    return (
        <form
            onSubmit={registrationHandler}
            className={formStyles.formWrapper}>
            <h2>Регистрация</h2>
            <Input
                type='text'
                placeholder='Имя'
                onChange={e => setName(e.target.value)}
                value={nameValue}
                name='name'
                error={false}
                ref={inputName}
                errorText='Ошибка'
                size='default'
            />
            <Input
                type='email'
                placeholder='E-mail'
                onChange={e => setEmail(e.target.value)}
                value={emailValue}
                name='email'
                error={false}
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
                <Button type="primary" size="small" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </div>
            {isError && errMsg &&
                (
                    <p className='text text_type_main-default' style={{ color: 'red' }}>
                        {errMsg}
                    </p>
                )
            }
            <p className='text text_type_main-default text_color_inactive'>
                Уже зарегистрированы? <Link to='/login' className={formStyles.link}>Войти</Link>
            </p>
        </form>

    )
}

export default Registration;
