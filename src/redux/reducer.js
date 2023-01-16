import { createSlice } from "@reduxjs/toolkit"
//import { number, string } from "prop-types"

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
        saveEmployee: {
            reducer(state, action) {
                state = action.payload
            }
        }
    },
    extraReducer(builder) { }
})

export const employeeToSave = state => state.employee

export const { logOut, saveEmployee } = employeeSlice.actions
export default employeeSlice.reducer