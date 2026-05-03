import React from 'react'
import ViewBtn from '../Buttons/ViewBtn'
import EditBtn from '../Buttons/EditBtn'
import DeleteBtn from '../Buttons/DeleteBtn'

const Row = ({ row, columns, onView, onEdit, onDelete, actions }) => {
  const renderCell = (col) => {
    const value = row[col.key];
    switch (col.type) {
      case 'text':
        return value;
      case 'image':
        return <img src={value} className='img-circle' alt='img' style={{width: '50px'}}/>;
      case 'badge':
        const badgeColor = typeof col.badgeClass === 'function' ? col.badgeClass(value) : (col.badgeClass || 'bg-secondary');
        return <span className={`badge ${badgeColor}`}>{value}</span>;
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
            {actions ? (
                actions(row)
            ) : (
                <>
                    {typeof onView === 'function' && <ViewBtn link={onView(row)} />}
                    {typeof onEdit === 'function' && <EditBtn link={onEdit(row)} />}
                    {typeof onDelete === 'function' && <DeleteBtn onClick={() => onDelete(row)} />}
                </>
            )}
        </td>
    </tr>
  )
}

export default Row