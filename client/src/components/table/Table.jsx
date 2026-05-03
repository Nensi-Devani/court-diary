import React from 'react'
import Row from './Row'

const Table = ({ columns, data, onView, onEdit, onDelete, actions }) => {
  return (
    <div className='card mx-3'>
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
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-muted">
                  No records found
                </td>
              </tr>
            ) : data.map((row, idx) => (
              <Row
                key={idx}
                row={row}
                columns={columns}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                actions={actions}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table