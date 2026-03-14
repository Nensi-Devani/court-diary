import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, icon: Icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className='nav-item'>
      <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
        <Icon className='nav-icon' />
        <p>{text}</p>
      </Link>
    </li>
  )
}

export default NavItem
