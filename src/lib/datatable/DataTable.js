import PropTypes from 'prop-types'
import './style_table.css'
import { Pagination } from './Pagination'

const DataTable = ({ thData, tdData, dataTitle }) => {
    return (
        <section className='data-table'>
            <h1>{dataTitle}</h1>
            <Pagination pullData={tdData} thData={thData} />
        </section>
    )
}

DataTable.propTypes = {}

export default DataTable