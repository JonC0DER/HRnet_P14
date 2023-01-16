import { useState } from "react"
import DatePicker from "../lib/datepicker.js/DatePicker"
import states from "../assets/datas/states"
import DropdownMenu from "../lib/dropdown_menu/DropdownMenu"
import { useDispatch } from "react-redux"
import { saveEmployee } from "../redux/reducer"

const Form = () => {
    const departments = [
        "Sales",
        "Marketing",
        "Engineering",
        "Human Resources",
        "Legal"
    ]

    const birthDateId = "date-of-birth"
    const startDateId = "start-date"

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [countryState, setCountryState] = useState('')
    const [department, setDepartment] = useState('')
    const [birthStorage, setBirthStorage] = useState('')
    const [startStorage, setStartStorage] = useState('')

    /*console.log('getDateBirth: ', birthStorage)
    console.log('getDateStart: ', startStorage)*/

    const formEntries = [
        firstName, lastName, street, city, zip,
        countryState, birthStorage, startStorage,
        department
    ]
    // console.log(formEntries)
    const canSave = formEntries.every(Boolean)

    const onSubmit = e => {
        e.preventDefault()

        if (canSave) {
            try {
                dispatch(saveEmployee({
                    firstName: firstName,
                    lastName: lastName,
                    birthDate: birthStorage,
                    startDate: startStorage,
                    street: street,
                    city: city,
                    zipCode: zip,
                    countryState: countryState,
                    department: department
                }))
            } catch (error) {
                console.log('Failed to Submit form ', error)
            }
            setStreet('')
            setCity('')
            setZip('')
            setCountryState('')
            setFirstName('')
            setLastName('')
            setDepartment('')
        }
    }

    return (
        <>
            <h2>Create Employee</h2>
            <form action="" id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor={birthDateId}>Date of Birth: </label>
                <DatePicker
                    onChange={(e) => setBirthStorage(e.target.value)}
                    elemId={birthDateId}
                />
                <label htmlFor={startDateId}>Start Date</label>
                <DatePicker
                    onChange={(e) => setStartStorage(e.target.value)}
                    elemId={startDateId}
                />
                <fieldset className="address">
                    <legend>Address</legend>
                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="state">State {countryState}</label>
                    <select name="state" id="state"
                        onChange={(e) => setCountryState(e.target.value)}
                    >
                        <DropdownMenu datas={states} />
                    </select>
                    <label htmlFor="zip-code">Zip Code</label>
                    <input id="zip-code" type="number" value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </fieldset>
                <label htmlFor="department">Department</label>
                <select name="department" id="department"
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value=""></option>
                    {departments.map((dep, id) => <option key={id} value={dep}>{dep}</option>)}
                </select>
                <button type="submit"
                    onClick={onSubmit}
                    disabled={!canSave}
                >Save</button>
            </form>
        </>
    )
}

export default Form