import React from 'react';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditBtn = ({ link }) => {
  const navigate = useNavigate();
  return (
    <button
      className='btn btn-warning btn-sm text-light mx-1'
      onClick={() => navigate(link)}
    >
      <FaPen />
    </button>
  );
};

export default EditBtn;