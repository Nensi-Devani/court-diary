import React from 'react'
import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import logo from '../../../assets/images/logo.jpg'
import user from '../../../assets/images/user.jpg'

const Sidebar = ({navItems}) => {
  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
        {/* Brand Logo */}
        <div className='brand-link mx-0'>
            <img src={logo} alt='Logo' className='brand-image img-circle elevation-3' style={{Opacity: '.8'}} />
            <span className='brand-text font-weight-light'>CourtDiary</span>
        </div>

        {/* Sidebar  */}
        <div className='sidebar'>
            {/* Sidebar user panel */}
            <div className='user-panel mt-3 pb-3 mb-3 d-flex mx-0'>
                <div className='image'>
                    <img src={user} className='img-circle elevation-2' alt='User Image' />
                </div>
                <div className='info'>
                    <Link to='#' className='d-block'>User</Link>
                </div>
            </div>

            {/* Sidebar Menu */}
            <nav className='mt-2'>
                <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
        
                    {navItems.map((item, index) => (
                        <NavItem
                            key={index}
                            to={item.to}
                            icon={item.icon}
                            text={item.text}
                        />
                    ))}

                </ul>
            </nav>
            {/* sidebar-menu */}
        </div>
        {/* sidebar */}
    </aside>
  )
}

export default Sidebar
