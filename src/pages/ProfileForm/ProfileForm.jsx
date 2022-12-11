import React, { useRef, useState, useEffect } from 'react';
import profileFormStyles from './ProfileForm.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, patchUser } from '../../services/actions/userInfo';

const ProfileForm = (props) => {

    const dispatch = useDispatch();
    const { email, name, pass } = useSelector(store => store.setUserReducer.user);

    useEffect(() => {
        dispatch(getUser());
    }, [])

    const [isInputChanged, setInputChanged] = useState(false)

    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [passwordValue, setPassword] = useState('');

    useEffect(() => setName(name), [name]);
    useEffect(() => setEmail(email), [email]);
    useEffect(() => setPassword(pass), [pass]);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const onIconClick = () => {
        nameRef.current.value = setName('');
        nameRef.current.focus()
    }
    const onIconClickMail = () => {
        emailRef.current.value = setEmail('');
        emailRef.current.focus()
    }
    const onIconClickPass = () => {
        passRef.current.value = setPassword('');
        passRef.current.focus()
    }

    const handleChangeInput = (e) => {
        e.target.name === 'name' && setName(e.target.value)
        e.target.name === 'email' && setEmail(e.target.value)
        e.target.name === 'pass' && setPassword(e.target.value)

        setInputChanged(true);
    }

    const onBlurHandler = (e) => {
        if (e.target.value === '') {
            e.target.name === 'name' && setName(name)
            e.target.name === 'email' && setEmail(email)
            e.target.name === 'pass' && setPassword(pass)
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(patchUser(userName, userEmail, passwordValue))
    }

    const onDeclineChanges = (e) => {
        e.preventDefault();
        setName(name);
        setEmail(email);
        setPassword(pass);

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
                value={userName}
                name='name'
                error={false}
                ref={nameRef}
                onIconClick={onIconClick}
                errorText='Ошибка'
                size='default'
            />
            <Input
                type='email'
                placeholder='Логин'
                onChange={handleChangeInput}
                onBlur={e => onBlurHandler(e)}
                icon='EditIcon'
                value={userEmail}
                name='email'
                error={false}
                ref={emailRef}
                onIconClick={onIconClickMail}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type='password'
                placeholder='Пароль'
                onChange={handleChangeInput}
                onBlur={e => onBlurHandler(e)}
                value={passwordValue}
                name='pass'
                error={false}
                ref={passRef}
                onIconClick={onIconClickPass}
                errorText='Ошибка'
                size='default'
                icon='EditIcon'
            />
            {
                isInputChanged && (
                    <div className={profileFormStyles.buttons}>
                        <button className={`${profileFormStyles.buttonLink} text text_type_main-small`} onClick={onDeclineChanges}>Отмена</button>
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
