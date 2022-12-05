import React, { useState, useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPass } from '../../../services/actions/userInfo';
import { Redirect } from 'react-router-dom'

const ForgotPass = (props) => {
    const dispatch = useDispatch();
    const { resetSent } = useSelector(store => store.setUserReducer)

    const [emailValue, setEmail] = useState('');
    const inputEmail = useRef(null);

    const buttonHandler = () => {
        dispatch(resetPass(emailValue))        
    }

    if (resetSent) {
        return <Redirect to='/reset-password' />
    };

    return (
        <div className={formStyles.formWrapper}>
            <h2>Восстановление пароля</h2>
            <Input
                type='email'
                placeholder='Укажите e-mail'
                onChange={e => setEmail(e.target.value)}
                value={emailValue}
                name='email'
                error={false}
                ref={inputEmail}
                errorText='Ошибка'
                size='default'
            />
            <div className='mb-20'>
                <Button type="primary" size="small" htmlType="button" onClick={buttonHandler}>
                    Восстановить
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

export default ForgotPass;
