import React, { useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../types/types';
import { resetPass } from '../../services/actions/userInfo';
import { Redirect } from 'react-router-dom';
import { useForm } from '../../utils/useForm';

const ForgotPass = () => {
    const dispatch = useDispatch();
    const { resetSent } = useSelector(store => store.setUserReducer)

    const { values, handleChange } = useForm();
    const inputEmail = useRef<HTMLInputElement>(null);

    const buttonHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        //@ts-ignore
        dispatch(resetPass(values))
    }

    if (resetSent) {
        return <Redirect
            to={{
                pathname: '/reset-password',
                state: { from: '/forgot-password' },
            }}
        />
    };

    return (
        <form onSubmit={buttonHandler} className={formStyles.formWrapper}>
            <h2>Восстановление пароля</h2>
            <Input
                type='email'
                placeholder='Укажите e-mail'
                onChange={handleChange}
                value={values.email || ''}
                name='email'
                error={false}
                ref={inputEmail}
                errorText='Ошибка'
                size='default'
            />
            <div className='mb-20'>
                <Button type="primary" size="small" htmlType="submit">
                    Восстановить
                </Button>
            </div>
            <div>
                <p className='text text_type_main-default text_color_inactive mb-4'>
                    Вспомнили пароль? <Link to='/login' className={formStyles.link}>Войти</Link>
                </p>
            </div>
        </form>
    )
}

export default ForgotPass;
