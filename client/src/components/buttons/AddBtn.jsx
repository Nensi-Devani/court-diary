import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddBtn = ({ title, to }) => {
  return (
    <Link to={to} className='btn btn-primary mx-3'>
      <FaPlus style={{ marginRight: '6px' }} />
      Add {title}
    </Link>
  );
};

export default AddBtn;