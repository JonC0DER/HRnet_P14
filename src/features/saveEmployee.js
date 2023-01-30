import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStorageValue, useCreateStoreData } from "../lib/uselocalstorage/useLocalStorage"
import { employeeToSave, msgToModale, savingEmployee } from "../redux/reducer"

/**
 * this function retreive employee state
 * get the employees data in the localStorage
 * and if is define push the new state in it
 * or create a new array to that.
 * formate them in a uniq array Object
 * then stringify to pass them to the localStarage
 * @param {object} employee retreive by the state
 * @returns {state} boolean state to dispatch
 */
export const SaveEmployee = () => {

    const dispatch = useDispatch()

    const employee = useSelector(employeeToSave)

    const items = "employees"
    const retreiveDataEmployees = getStorageValue(items, null)
    const isRetreiveAnArray = Array.isArray(retreiveDataEmployees)

    const cleanEmployee = (setEmployee) => {
        const keys = ['saving', 'status', 'modaleMsg']
        const newEmployee = {}
        Object.keys(setEmployee).forEach((key) => {
            if (!keys.includes(key)) {
                newEmployee[key] = setEmployee[key]
            }
        })

        return newEmployee
    }

    /**
     * You have to be sure that the data
     * contains uniq objects
     * @param {*} array you need to filter 
     * @returns {array} array with uniq objects
     */
    const uniqObj = (array) => {
        const uniqObjArray = array.reduce((uniq, obj) => {
            const key = obj.firstName + obj.lastName
            if (!uniq[key]) {
                uniq[key] = obj
            }
            return uniq
        }, {})
        return Object.values(uniqObjArray)
    }

    /**
     * retreive the data from localstorage by getItem
     * then return array if data exist or 
     * undefined if data dosn't exist
     * @returns {array | undefined} {array | undifined}
     */
    const arrayFormatData = () => {
        if (retreiveDataEmployees) {
            if (isRetreiveAnArray) return retreiveDataEmployees
            else {
                const newArray = []
                newArray.push(retreiveDataEmployees)
                return newArray
            }
        }
    }
    /**
     * 
     * @returns {array} uniq array of objects
     */
    const prepareData = () => {
        const oldData = arrayFormatData()
        const isDefine = oldData !== undefined
        const newArray = isDefine ? oldData : []
        const newEmployee = cleanEmployee(employee)
        newArray.push(newEmployee)
        return uniqObj(newArray)
    }

    const createData = useCreateStoreData(items, prepareData())
    //console.log('isRetreiveData : ', prepareData())

    const returnToRegisterWithMsg = useCallback((bool, msg, errorMsg) => {
        try {
            dispatch(savingEmployee(bool))
            dispatch(msgToModale(msg))
        } catch (error) {
            console.log(errorMsg, error)
        }
    }, [dispatch])

    useEffect(() => {
        const isDataStored = () => {
            if (createData) {
                const msg = 'Successfuly created Employee !'
                const errorMsg = 'Failed Saving Employee to localStorage'
                returnToRegisterWithMsg(false, msg, errorMsg)
            } else {
                const msg = ''
                const errorMsg = 'Failed to create Employee & to send msg to modale'
                returnToRegisterWithMsg(false, msg, errorMsg)
            }
        }

        isDataStored()
    }, [createData, returnToRegisterWithMsg])

}
