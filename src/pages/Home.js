import React from "react"
import { NavLink } from "react-router-dom"
import Form from "../components/Form"

const NewEmployeeContainer = () => {
    return (
        <div className="container">
            <NavLink to="/reset-employee">View current employees</NavLink>
            <Form />
        </div>
    )
}

export default NewEmployeeContainer