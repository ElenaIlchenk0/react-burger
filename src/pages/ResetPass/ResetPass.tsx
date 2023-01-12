import React, { useRef, useEffect } from 'react';
import formStyles from '../form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/types/reduxTypes';
import { provideNewPass } from '../../services/actions/userInfo';
import { THistoryFrom } from '../../utils/types/types';
import { useShowPass } from '../../utils/hooks/useShowPass';
import { useForm } from '../../utils/hooks/useForm';

const ResetPass = () => {
    const dispatch = useDispatch();
    const { resetDone } = useSelector(store => store.setUserReducer);
    const history = useHistory<THistoryFrom>();

    const { values, handleChange } = useForm();
    const { isPassShow, togglePass } = useShowPass(false);

    const inputPass = useRef(null)

    const buttonHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(provideNewPass(values));
    }

    useEffect(() => {
        console.log('resetDone', resetDone)
        console.log('history.location.state?.from', history.location.state?.from)
        if (resetDone || history.location.state?.from !== '/forgot-password') {
            history.replace('/login')
        }
    }, [resetDone, history])

    return (
        <form onSubmit={buttonHandler} className={formStyles.formWrapper}>
            <h2>Восстановление пароля</h2>
            <Input
                type={isPassShow ? 'text' : 'password'}
                placeholder='Введите новый пароль'
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
            <Input
                type='password'
                placeholder='Введите код из письма'
                onChange={handleChange}
                value={values.token || ''}
                name='token'
                error={false}
                errorText='Ошибка'
                size='default'
            />
            <div className='mb-20'>
                <Button type="primary" size="small" htmlType="submit">
                    Сохранить
                </Button>
            </div>
            <div>
                <p className='text text_type_main-default text_color_inactive mb-4'>
                    Вспомнили пароль?
                    <Link to='/login' className={formStyles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </form>

    )
}

export default ResetPass;
