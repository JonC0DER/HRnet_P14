import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './style_table.css'
import { current } from '@reduxjs/toolkit'

const DataTable = ({ thData, tdData, dataTitle }) => {
    const numberOfLines = [5, 10, 15, 30, 50, 100]

    const [nbRows, setNbRows] = useState(numberOfLines[0])
    const [startElem, setStartElem] = useState(0)
    const [endElem, setEndElem] = useState(nbRows)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchState, setSearchState] = useState('')
    const [tdDataState, setTdDataState] = useState(tdData)
    const [lastActive, setLastActive] = useState(null)
    //console.log(nbRows)

    const nbPages = Math.ceil(tdData.length / nbRows)
    const dataLen = tdData.length
    const firstPage = tdData.slice(0, nbRows)
    const lastPage = tdData.slice((nbPages * nbRows) - nbRows, dataLen)

    const onSetNumberOfRows = (e) => {
        setNbRows(e.target.value)
        setTdDataState(firstPage)
    }

    const onSearchSomething = (e) => setSearchState(e.target.value)

    const pagination = () => {
        const currentPageData = tdData.slice(startElem, endElem)
        console.log(currentPageData)
        setTdDataState(currentPageData)
    }

    const previousPage = () => {
        if ((startElem - nbRows) >= 0) {
            setStartElem(startElem - (nbRows))
            setEndElem(endElem - nbRows)
            pagination()
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if ((endElem + nbRows) <= dataLen) {
            setStartElem(startElem + (nbRows))
            setEndElem(endElem + nbRows)
            pagination()
            setCurrentPage(currentPage + 1)
        }
    }
    //console.log(pagination())

    useEffect(() => {
        if (searchState.length > 0) {
            const result = tdData.filter(item => {
                return Object.values(item).some(itemValue =>
                    new RegExp(searchState, 'i').test(itemValue)
                )
            })
            setTdDataState(result)
        } else
            setTdDataState(tdData)
    }, [searchState, tdData])

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

        const arSort = _.sortBy(tdData, column)
        const result = direction === 'up' ? arSort : arSort.reverse()
        classes.add(activeClasse)
        setLastActive(e)
        setTdDataState(result)
    }

    return (
        <section className='data-table'>
            <h1>{dataTitle}</h1>
            <div className="table-filter">
                <div className="select-number">
                    <span>Show</span>&nbsp;
                    <select
                        onChange={onSetNumberOfRows}
                        name="select-numnber-rows"
                        id="select-number-rows"
                    >
                        {numberOfLines.map((nb, key) =>
                            <option key={key}
                                value={`${nb}`}
                            >
                                {nb}
                            </option>
                        )}
                    </select>
                    &nbsp;<span>Entries</span>
                </div>
                <div className="search-bar">
                    <label htmlFor="search-bar">Search: </label>
                    <input
                        value={searchState}
                        onChange={onSearchSomething}
                        type="search" id="seach-bar"
                    />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {Object.entries(thData).map((entry, entryKey) =>
                            <th key={entryKey}>
                                <div className="th-content">
                                    <span>{entry[1]}</span> &nbsp;
                                    <div className="arrow-btn">
                                        <div
                                            className=''
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
            <div className="table-footer">
                <p>Showing {currentPage} to {nbPages} of {nbPages} entries</p>
                <div className="pagination">
                    <button
                        onClick={previousPage}
                        className="previous-btn"
                    >Previous</button>
                    <div className="current-page">{currentPage}</div>
                    <button
                        onClick={nextPage}
                        className='next-btn'
                    >Next</button>
                </div>
            </div>
        </section>
    )
}

DataTable.propTypes = {}

export default DataTable