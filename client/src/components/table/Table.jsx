import React from 'react'
import Row from './Row'

const Table = ({ columns, data, onView, onEdit, onDelete }) => {
  return (
    <div className='card'>
      <div className='card-body p-0'>
        <table className='table table-striped text-center'>
          <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                ))}
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <Row
                key={idx}
                row={row}
                columns={columns}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table