import React from 'react'
import { FaEye } from 'react-icons/fa'

const ViewBtn = ({ onClick }) => {
  return (
    <button className='btn btn-primary btn-sm' onClick={onClick}>
      <FaEye />
    </button>
  )
}

export default ViewBtn