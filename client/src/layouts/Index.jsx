import React from 'react'
import { Outlet } from 'react-router-dom'
import { FaTachometerAlt, FaCalendarAlt, FaFile, FaUsers, FaGraduationCap } from 'react-icons/fa'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/navbar/Sidebar'

const Index = () => {
  const userNavItems = [
    { to: '/', icon: FaTachometerAlt, text: 'Dashboard' },
    { to: '/meetings', icon: FaCalendarAlt, text: 'Meetings' },
    { to: '/cases', icon: FaFile, text: 'Cases' },
    { to: '/clients', icon: FaUsers, text: 'Clients' }
  ]
  
  const adminNavItems = [
    { to: '/admin', icon: FaTachometerAlt, text: 'Dashboard' },
    { to: '/admin/lawyers', icon: FaGraduationCap, text: 'Lawyers' },
    { to: '/admin/cases', icon: FaFile, text: 'Cases' },
    { to: '/admin/clients', icon: FaUsers, text: 'Clients' }
  ]

  const userRole = 'user';

  return (
    <div className='wrapper'>
      <Header />
      <Sidebar navItems={userRole === 'admin' ? adminNavItems : userNavItems} />
      
      <div className='content-wrapper'>
        <Outlet />
      </div>
    
    </div>
  )
}

export default Index
