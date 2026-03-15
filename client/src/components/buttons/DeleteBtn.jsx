import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const DeleteBtn = ({ onClick }) => {
  return (
    <button className='btn btn-danger btn-sm' onClick={onClick}>
      <FaTrashAlt />
    </button>
  )
}

export default DeleteBtn