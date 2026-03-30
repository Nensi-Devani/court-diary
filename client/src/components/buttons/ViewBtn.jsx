import React from 'react'
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ViewBtn = ({ link }) => {
  const navigate = useNavigate();
  return (
    <button 
      className='btn btn-primary btn-sm' 
      onClick={() => navigate(link)}
    >
      <FaEye />
    </button>
  )
}

export default ViewBtn