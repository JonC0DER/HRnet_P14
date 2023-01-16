import { PropTypes } from "prop-types"

const DatePicker = ({ elemId, onChange }) => {

    return (
        <input
            type="date"
            onChange={onChange}
            id={elemId}
        />
    )
}

DatePicker.propTypes = {
    elemId: PropTypes.string
}

export default DatePicker