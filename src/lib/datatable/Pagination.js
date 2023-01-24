import { SearchBar } from './SearchBar'
import { useState } from 'react'
import { Table } from './Table'
import { useEffect } from 'react'
import { useCallback } from 'react'

export const Pagination = (props) => {
    const tdData = props.pullData
    const numberOfLines = [5, 10, 15, 30, 50, 100]

    const [nbRows, setNbRows] = useState(5)
    const [endElem, setEndElem] = useState(5)

    const [startElem, setStartElem] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const [searchState, setSearchState] = useState('')
    const [tdDataState, setTdDataState] = useState(tdData)

    const nbPages = Math.ceil(tdData.length / nbRows)
    const dataLen = tdData.length
    const currentPageData = tdData.slice(startElem, endElem)
    const firstPage = () => tdData.slice(0, nbRows)
    const lastPage = () => tdData.slice((nbPages * nbRows) - nbRows)

    const onSetNumberOfRows = (e) => {
        const nbLines = Number(e.target.value)
        setNbRows(nbLines)
        setStartElem(0)
        setEndElem(nbLines)
        setCurrentPage(1)
        setDisableNext(false)
        setDisablePrev(true)
        setTdDataState(currentPageData)
    }

    const onSearchSomething = (e) => {
        setSearchState(e.target.value)
        const searchRetreiveData = JSON.parse(e.target.dataset['retreivesearch'])
        setTdDataState(searchRetreiveData)
    }

    const previousPage = () => {
        if (startElem - nbRows >= 0) {
            setStartElem(startElem - nbRows)
            setEndElem(endElem - nbRows)
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (endElem + nbRows >= dataLen + nbRows) {
            const lastPageData = lastPage()
            setTdDataState(lastPageData)
        }
        if (endElem + nbRows <= (dataLen + nbRows)) {
            setStartElem(startElem + nbRows)
            setEndElem(endElem + nbRows)
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        if (currentPage === 1) {
            console.log(' current page == 1')
            setDisablePrev(true)
        }
        else if (currentPage === nbPages) {
            setDisableNext(true)
        } else {
            setDisablePrev(false)
            setDisableNext(false)
        }
    }, [currentPage, nbPages])

    /*const callback = useCallback(() => {
        setTdDataState(currentPageData)
    }, [currentPageData])

    useEffect(() => {
        callback()
    }, [callback])*/

    return (
        <>
            <div className="table-filter" >
                <div className="select-number" >
                    <span>Show</span>&nbsp;
                    <select
                        onChange={onSetNumberOfRows}
                        name="select-numnber-rows" id="select-number-rows"
                    >
                        {numberOfLines.map((nb, key) =>
                            <option key={key} value={`${nb}`}> {nb}</option>
                        )}
                    </select>
                    &nbsp;<span>Entries</span>
                </div>
                <SearchBar
                    value={searchState} tdData={tdData} onChange={onSearchSomething}
                />
            </div>
            <Table thData={props.thData} tdData={tdData} tdDState={currentPageData} />
            <div className="table-footer">
                <p>Showing {currentPage} to {nbPages} of {nbPages} entries</p>
                <div className="pagination">
                    <button
                        onClick={previousPage} disabled={disablePrev}
                        className="previous-btn"
                    >Previous</button>
                    <div className="current-page">{currentPage}</div>
                    <button
                        onClick={nextPage} disabled={disableNext}
                        className='next-btn'
                    >Next</button>
                </div>
            </div>
        </>
    )
}
