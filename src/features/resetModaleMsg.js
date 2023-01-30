import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { msgToModale } from '../redux/reducer'

export const ResetModaleMsg = () => {
    const dispatch = useDispatch()
    const [resetBool, setResetBool] = useState(false)

    const resetModale = useCallback(() => {
        try {
            dispatch(msgToModale(undefined))
            setResetBool(true)
        } catch (error) {
            setResetBool(false)
            console.log('Failedto reset modale msg ', error)
        }
    }, [dispatch])

    useEffect(() => {
        resetModale()
    }, [resetModale])

    return (
        <>
            {resetBool
                ? <Navigate to='/employee-list' />
                : null
            }
        </>
    )
}
