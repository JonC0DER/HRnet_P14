import { useEffect, useState } from "react"

export const SearchBar = ({ tdData, onChange, value }) => {
    const [tdDataState, setTdDataState] = useState(tdData)

    useEffect(() => {
        if (value.length > 0) {
            const result = tdData.filter(item => {
                return Object.values(item).some(itemValue =>
                    new RegExp(value, 'i').test(itemValue)
                )
            })
            setTdDataState(result)
        } else
            setTdDataState(tdData)
    }, [value, tdData])

    return (
        <div className="search-bar">
            <label htmlFor="search-bar">Search: </label>
            <input
                value={value}
                onChange={onChange}
                data-retreivesearch={JSON.stringify(tdDataState)}
                type="search" id="seach-bar"
            />
        </div>
    )
}
