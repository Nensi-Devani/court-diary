import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
      {/* Left navbar links */}
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            data-widget='pushmenu'
            to='#'
            role='button'
          >
            <i className='fas fa-bars'></i>
          </Link>
        </li>
        <li className='nav-item d-none d-sm-inline-block'>
          <Link to='/home' className='nav-link'>
            Home
          </Link>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className='navbar-nav ml-auto'>
        {/* Notifications Dropdown Menu */}
        <li className='nav-item dropdown'>
          <Link className='nav-link' data-toggle='dropdown' to='#'>
            <i className='far fa-bell'></i>
            <span className='badge badge-warning navbar-badge'>1</span>
          </Link>
          <div className='dropdown-menu dropdown-menu-lg dropdown-menu-right'>
            <span className='dropdown-item dropdown-header'>
              1 Notifications
            </span>
            <div className='dropdown-divider'></div>
            <Link to='#' className='dropdown-item'>
              <i className='fas fa-envelope mr-2'></i> Client Meeting Reminder
              <span className='float-right text-muted text-sm'>3 mins</span>
            </Link>
          </div>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            data-widget='fullscreen'
            to='#'
            role='button'
          >
            <i className='fas fa-expand-arrows-alt'></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header
