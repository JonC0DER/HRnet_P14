import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const Table = ({ thData, tdData, tdDState }) => {

    const [tdDataState, setTdDataState] = useState(tdData)
    const [lastActive, setLastActive] = useState(null)

    const onFilterList = (e) => {
        const _ = require('lodash')
        const column = e.target.dataset["column"]
        const direction = e.target.dataset["direction"]
        const classes = e.target.classList
        const activeClasse = 'active'

        if (lastActive) {
            const lastClasses = lastActive.target.classList
            if (lastClasses.contains(activeClasse)) {
                lastClasses.remove(activeClasse)
            }
        }

        const arSort = _.sortBy(tdDataState, column)
        const result = direction === 'up' ? arSort : arSort.reverse()
        classes.add(activeClasse)
        setLastActive(e)
        setTdDataState(result)
    }

    const callback = useCallback(() => {
        setTdDataState(tdDState)
    }, [tdDState])

    useEffect(() => {
        callback()
    }, [callback])

    return (
        <table>
            <thead>
                <tr>
                    {Object.entries(thData).map((entry, entryKey) =>
                        <th key={entryKey}>
                            <div className="th-content">
                                <span>{entry[1]}</span> &nbsp;
                                <div className="arrow-btn">
                                    <div
                                        data-isactive={`${entry[0]}dn`}
                                        data-column={entry[0]}
                                        data-direction={'up'}
                                        onClick={onFilterList}
                                    >&#9650;</div>
                                    <div
                                        data-isactive={`${entry[0]}dn`}
                                        data-column={entry[0]}
                                        data-direction={'dn'}
                                        onClick={onFilterList}
                                    >&#9660;</div>
                                </div>
                            </div>
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tdDataState.map((tr, trKey) =>
                    <tr key={trKey}>
                        {Object.values(tr).map((td, tdKey) =>
                            <td key={tdKey}>{td}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}
