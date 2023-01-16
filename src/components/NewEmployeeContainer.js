import { NavLink } from "react-router-dom"
import Form from "./Form"

const NewEmployeeContainer = () => {
    return (
        <div className="container">
            <NavLink to="/employee-list">View current employees</NavLink>
            <Form />
        </div>
    )
}

export default NewEmployeeContainer