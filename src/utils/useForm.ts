import React from "react";

export const useForm = () => {
    const [values, setValues] = React.useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const value = input.value;
        const name = input.name;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}
