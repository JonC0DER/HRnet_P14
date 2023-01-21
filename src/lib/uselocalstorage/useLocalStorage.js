import { useEffect, useState } from 'react'

export const getStorageValue = (value, defaultValue) => {
    const getValue = localStorage.getItem(value)
    const parseValue = JSON.parse(getValue)
    return parseValue || defaultValue
}

export const useCreateStoreData = (item, value) => {
    try {
        useEffect(() => {
            localStorage.setItem(item, JSON.stringify(value))
        }, [item, value])
    } catch (error) {
        console.log('Failed to store data with localStorage.setItem ', error)
        return false
    }
    return true
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
