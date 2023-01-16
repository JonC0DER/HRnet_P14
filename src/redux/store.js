import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from './reducer'

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
    }
})