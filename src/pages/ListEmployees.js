import { NavLink } from "react-router-dom"
import DataTable from "../lib/datatable/DataTable"
import theadData from '../assets/datas/th-titles'
import Employees from '../assets/datas/Employees.json'
import { getStorageValue } from "../lib/uselocalstorage/useLocalStorage"

const ListEmployees = () => {
    const employeesData = Employees

    const retreiveEmployees = () => {
        const employeesStore = getStorageValue('employees', null)
        return employeesStore
    }

    const isExist = retreiveEmployees() !== null
    const h1Title = (isExist
        ? 'Current Employees from localStorage'
        : 'Current Employees from JSON !'
    )

    const chooseData = isExist ? retreiveEmployees() : employeesData

    return (
        <>
            <DataTable
                thData={theadData}
                tdData={chooseData}
                dataTitle={h1Title}
            />
            <NavLink to='/'>Home</NavLink>
        </>
    )
}

export default ListEmployees