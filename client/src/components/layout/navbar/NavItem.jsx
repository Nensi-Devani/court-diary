import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ to, icon : Icon, text }) => {
  return (
    <li className='nav-item'>
      <Link to={to} className='nav-link'>
        <Icon className={'nav-icon'} />
        <p className='mx-1'>{text}</p>
      </Link>
    </li>
  )
}

export default NavItem
