import React from 'react';
import { TUser } from '../types/types'

export const useForm = () => {
    const [values, setValues] = React.useState<TUser>({ name: '', email: '', pass: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const value = input.value;
        const name = input.name;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}
