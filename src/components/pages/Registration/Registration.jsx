import React, { useState, useRef, useEffect } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../../services/actions/userInfo';
import { useDispatch, useSelector } from 'react-redux';

const Registration = (props) => {
    const dispatch = useDispatch();
    const { isError, errMsg, isAuthenticated } = useSelector(store => store.setUserReducer);

    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) history.replace('/')
    })

    const [nameValue, setName] = useState('')
    const [emailValue, setEmail] = useState('')
    const [passwordValue, setPassword] = useState('')
    const inputName = useRef(null)
    const inputEmail = useRef(null)
    const inputPass = useRef(null)

    const onIconClickName = () => {
        setTimeout(() => inputEmail.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const onIconClick = () => {
        setTimeout(() => inputEmail.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const showPass = () => {
        setTimeout(() => inputPass.current.focus(), 0)
        alert('Icon Click Callback showPass')
    }

    const registrationHandler = () => {
        dispatch(registerUser(emailValue, passwordValue, nameValue));
    }

    return (
        <div className={formStyles.formWrapper}>
            <h2>Вход</h2>
            <Input
                type='text'
                placeholder='Имя'
                onChange={e => setName(e.target.value)}
                value={nameValue}
                name='name'
                error={false}
                ref={inputName}
                onIconClick={onIconClickName}
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
                <Button type="primary" size="small" htmlType="button" onClick={registrationHandler}>
                    Зарегистрироваться
                </Button>
            </div>
            {isError && errMsg && 
                (
                    <p className='text text_type_main-default' style={{color: 'red'}}>
                        {errMsg}
                    </p>
                )
            }
            <p className='text text_type_main-default text_color_inactive'>
                Уже зарегистрированы? <Link to='/login' className={formStyles.link}>Войти</Link>
            </p>
        </div>

    )
}

export default Registration;
