import React, { useState, useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/fetchCheckResponse';
import { BURGER_API_URL } from '../../../utils/constants'

const ResetPass = (props) => {
    const [tokenValue, setToken] = useState('')
    const [passwordValue, setPassword] = useState('')
    const inputPass = useRef(null)
    const inputToken = useRef(null)

    const showPass = () => {
        setTimeout(() => inputPass.current.focus(), 0)
        alert('Icon Click Callback showPass')
    }

    const onIconClick = () => {
        setTimeout(() => inputToken.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const buttonHandler = () => {
        request(`${BURGER_API_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "password": passwordValue,
                "token": tokenValue
            })
        }).then(res => {
            if (res.success) {
                console.log(res)
            }
        }).catch((err) => Promise.reject(err))

    }

    return (
        <div className={formStyles.formWrapper}>
            <h2>Восстановление пароля</h2>
            <Input
                type='password'
                placeholder='Введите новый пароль'
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
            <Input
                type='password'
                placeholder='Введите код из письма'
                onChange={e => setToken(e.target.value)}
                value={tokenValue}
                name='code'
                error={false}
                ref={inputToken}
                onIconClick={onIconClick}
                errorText='Ошибка'
                size='default'
            />
            <div className='mb-20'>
                <Button type="primary" size="small" htmlType="button" onClick={buttonHandler}>
                    Сохранить
                </Button>
            </div>
            <div>
                <p className='text text_type_main-default text_color_inactive mb-4'>
                    Вспомнили пароль? <Link to='/login' className={formStyles.link}>Войти</Link>
                </p>
            </div>
        </div>

    )
}

export default ResetPass;
