import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: '',
    lastName: '',
    birthDate: '',
    startDate: '',
    street: '',
    city: '',
    countryState: '',
    zipCode: 0,
    department: '',
    status: 'idle'
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        logOut: state => initialState,
        setStateEmployee: {
            reducer(state, action) {
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.birthDate = action.payload.birthDate
                state.startDate = action.payload.startDate
                state.street = action.payload.street
                state.city = action.payload.city
                state.countryState = action.payload.countryState
                state.zipCode = action.payload.zipCode
                state.department = action.payload.department
            }
        },
        savingEmployee: {
            reducer(state, action) {
                state.saving = action.payload
            }
        },
        msgToModale: {
            reducer(state, action) {
                state.modaleMsg = action.payload
            }
        }
    },
    extraReducer(builder) { }
})

export const employeeToSave = state => state.employee
export const getSavingState = state => state.employee.saving
export const getModaleMsg = state => state.employee.modaleMsg

export const {
    logOut,
    setStateEmployee,
    savingEmployee,
    msgToModale
} = employeeSlice.actions
export default employeeSlice.reducer