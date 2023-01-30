import React, { useEffect, useRef, useState } from 'react'

export const Modale = ({ msg }) => {
    const isMsg = msg !== undefined

    const [close, setClose] = useState(false)

    const initPosY = 'init-pos-y'
    const out = 'out'
    const animDropDown = 'animate-modale'
    const animGoUp = 'animate-reverse'

    const onCloseModal = () => setClose(true)
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    const modal = useRef()
    useEffect(() => {
        const modalCls = modal.current.classList
        const parentCls = modal.current.parentElement.classList
        const canParentInit = parentCls.contains(out)
            && parentCls.contains(initPosY)

        if (!close) {
            modalCls.add(animDropDown)
            if (modalCls.contains(initPosY)) {
                modalCls.remove(initPosY)
            }
            if (canParentInit) {
                parentCls.remove(initPosY)
                parentCls.remove(out)
            }
        }
        else {
            modalCls.add(initPosY)
            modalCls.remove(animDropDown)
            modalCls.add(animGoUp)
            wait(700).then(() => {
                parentCls.add(initPosY)
                parentCls.add(out)
            })
        }
    }, [isMsg, close])

    return (
        <div className="modale-content">
            <div ref={modal} className={`modale ${initPosY}`}>
                <span className="close"
                    onClick={onCloseModal}
                >&#10006;</span>
                <h3 className='msg'>{isMsg ? msg : 'Message Test!'}</h3>
            </div>
        </div>
    )
}
