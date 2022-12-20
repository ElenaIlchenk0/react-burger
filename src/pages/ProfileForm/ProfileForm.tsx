import React, { useRef, useState, useEffect } from 'react';
import profileFormStyles from './ProfileForm.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, patchUser } from '../../services/actions/userInfo';
import { useForm } from '../../utils/useForm';

const ProfileForm = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { user } = useSelector(store => store.setUserReducer);

    useEffect(() => {
        // @ts-ignore
        dispatch(getUser());
    }, [])

    const { values, handleChange, setValues } = useForm();

    const [isInputChanged, setInputChanged] = useState(false)

    useEffect(() => {
        setValues({ name: user.name, email: user.email, pass: user.pass });
    }, [])

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const refs: { [key: string]: React.RefObject<HTMLInputElement> } = {
        name: nameRef,
        email: emailRef,
        pass: passRef
    }

    const onIconClick = (value: string) => {
        setValues({ ...values, [value]: '' });
        refs[value].current!.focus()
        setInputChanged(true)
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setInputChanged(true);
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement> | undefined) => {
        if (e!.target.value === '') {
            setValues({ ...values, [e!.target.name]: user[e!.target.name] })
            setInputChanged(false)
        }
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // @ts-ignore
        dispatch(patchUser(values));
        setInputChanged(false);
    }

    const onDeclineChanges = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        setValues({ name: user.name, email: user.email, pass: user.pass });
        setInputChanged(false);
    }

    return (
        <form onSubmit={onSubmitHandler} className={profileFormStyles.form}>
            <Input
                type='text'
                placeholder='Имя'
                onChange={handleChangeInput}
                onBlur={e => onBlurHandler(e)}
                icon={'EditIcon'}
                value={values.name || ''}
                name='name'
                error={false}
                ref={nameRef}
                onIconClick={() => onIconClick('name')}
                errorText='Ошибка'
                size='default'
                extraClass='test'
            />
            <Input
                type='email'
                placeholder='Логин'
                onChange={handleChangeInput}
                onBlur={e => onBlurHandler(e)}
                icon='EditIcon'
                value={values.email || ''}
                name='email'
                error={false}
                ref={emailRef}
                onIconClick={() => onIconClick('email')}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type='password'
                placeholder='Пароль'
                onChange={handleChangeInput}
                onBlur={e => onBlurHandler(e)}
                value={values.pass || ''}
                name='pass'
                error={false}
                ref={passRef}
                onIconClick={() => onIconClick('pass')}
                errorText='Ошибка'
                size='default'
                icon='EditIcon'
            />
            {
                isInputChanged && (
                    <div className={profileFormStyles.buttons}>
                        <button
                            className={`${profileFormStyles.buttonLink} text text_type_main-small`}
                            onClick={onDeclineChanges}>
                            Отмена
                        </button>
                        <Button type="primary" size="medium" htmlType="submit">
                            Сохранить
                        </Button>
                    </div>
                )
            }
        </form>
    )
}

export default ProfileForm;
