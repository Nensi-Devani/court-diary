import React from 'react'
import ViewBtn from '../Buttons/ViewBtn'
import EditBtn from '../Buttons/EditBtn'
import DeleteBtn from '../Buttons/DeleteBtn'

const Row = ({ row, columns, onView, onEdit, onDelete }) => {
  const renderCell = (col) => {
    const value = row[col.key];
    switch (col.type) {
      case 'text':
        return value;
      case 'image':
        return <img src={value} className='img-circle' alt='img' style={{width: '50px'}}/>;
      case 'badge':
        return <span className={`badge ${col.badgeClass || 'bg-secondary'}`}>{value}</span>;
      default:
        return value;
    }
  };
 
  return (
    <tr>
        {columns.map((col) => (
            <td key={col.key}>{renderCell(col)}</td>
        ))}
      
        <td>
            <ViewBtn link={onView(row)} />
            <EditBtn link={onEdit(row)} />
            <DeleteBtn onClick={() => onDelete(row)} />
        </td>
    </tr>
  )
}

export default Row