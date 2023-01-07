import React, { useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/userInfo';
import { useDispatch, useSelector } from '../../types/reduxTypes';
import { useShowPass } from '../../utils/useShowPass';
import { useForm } from '../../utils/useForm'

const Registration = () => {
    const dispatch = useDispatch();
    const { isError, errMsg } = useSelector(store => store.setUserReducer);

    const { values, handleChange } = useForm();
    const { isPassShow, togglePass } = useShowPass(false);

    const inputName = useRef<HTMLInputElement>(null)
    const inputPass = useRef<HTMLInputElement>(null)

    const registrationHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(values))
    }

    return (
        <form
            onSubmit={registrationHandler}
            className={formStyles.formWrapper}>
            <h2>Регистрация</h2>
            <Input
                type='text'
                placeholder='Имя'
                onChange={handleChange}
                value={values.name || ''}
                name='name'
                error={false}
                ref={inputName}
                errorText='Ошибка'
                size='default'
            />
            <Input
                type='email'
                placeholder='E-mail'
                onChange={handleChange}
                value={values.email || ''}
                name='email'
                error={false}
                errorText='Ошибка'
                size='default'
            />
            <Input
                type={isPassShow ? 'text' : 'password'}
                placeholder='Пароль'
                onChange={handleChange}
                value={values.pass || ''}
                name='pass'
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
