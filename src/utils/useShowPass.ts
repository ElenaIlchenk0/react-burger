import React, { useState } from 'react'

export const useShowPass = (value: boolean) => {
    const [isPassShow, setPassShow] = useState(value);

    const togglePass = () => {
        isPassShow ? setPassShow(false) : setPassShow(true)
    }

    return { isPassShow, togglePass }
}
