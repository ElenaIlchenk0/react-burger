import React, { useRef } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { loginUser } from '../../services/actions/userInfo';
import { useDispatch, useSelector } from '../../types/types';
import { THistoryFrom } from '../../types/types';
import { useShowPass } from '../../utils/useShowPass';
import { useForm } from '../../utils/useForm';

const Login = () => {
    const dispatch = useDispatch();
    const { user, isError, errMsg } = useSelector(store => store.setUserReducer);

    const history = useHistory<THistoryFrom>();
    const location = useLocation<THistoryFrom>();

    const { values, handleChange } = useForm();
    const { isPassShow, togglePass } = useShowPass(false);

    const inputEmail = useRef<HTMLInputElement>(null)
    const inputPass = useRef<HTMLInputElement>(null)

    const loginHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
       
        dispatch(loginUser(values));
        if (user) {
            const { from } = location.state || { from: { pathname: "/" } };
            history.push(from);
        }
    }

    return (
        <form onSubmit={loginHandler} className={formStyles.formWrapper}>
            <h2>Вход</h2>
            <Input
                type='email'
                placeholder='E-mail'
                onChange={handleChange}
                value={ values.email || '' }
                name='email'
                error={false}
                ref={inputEmail}
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
                <Button type="primary" size="small" htmlType="submit" >
                    Войти
                </Button>
            </div>
            {isError && errMsg &&
                (
                    <p className='text text_type_main-default' style={{ color: 'red' }}>
                        {errMsg}
                    </p>
                )
            }
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
