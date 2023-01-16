import { useEffect, useState } from 'react'

const getStorageValue = (value, defaultValue) => {
    const getValue = localStorage.getItem(value)
    const parseValue = JSON.parse(getValue)
    return parseValue || defaultValue
}

export const useLocalStorage = (value, defaultValue) => {
    const [storageValue, setStorageValue] = useState(() => {
        return getStorageValue(value, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(value, JSON.stringify(storageValue))
    }, [value, storageValue])

    return [storageValue, setStorageValue]
}
