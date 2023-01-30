import React from "react"
import PropTypes from 'prop-types'

const DropdownMenu = ({ datas }) => {

    return (
        <>
            <option value="">Choose your country</option>
            {datas.map((elem, id) =>
                <option
                    key={id}
                    value={elem.abbreviation}
                >
                    {elem.name}
                </option>
            )}
        </>
    )
}

DropdownMenu.propTypes = {
    datas: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.string)
    )
}

export default DropdownMenu