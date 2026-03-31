import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from '../layouts/Index'

import Dashboard from '../pages/dashboard/Index'
import AdminDashboard from '../pages/admin/dashboard/Index'

import LawyersIndex from '../pages/admin/lawyers/Index'
import LawyersCreate from '../pages/admin/lawyers/Create'
import LawyersEdit from '../pages/admin/lawyers/Edit'

import MeetingsIndex from '../pages/meetings/Index'

import CasesIndex from '../pages/cases/Index'
import CasesCreate from '../pages/cases/Create'
import CasesEdit from '../pages/cases/Edit'

import ClientsIndex from '../pages/clients/Index'
import ClientsCreate from '../pages/clients/Create'
import ClientsEdit from '../pages/clients/Edit'

import Login from '../pages/auth/Login'
import Profile from '../pages/profile/Index'
import ProfileEdit from '../pages/profile/Edit'
import ProfileChangePassword from '../pages/profile/ChangePassword'

const AppRoutes = () => {
  return (
    <Routes>

      {/* Auth */}
      <Route path='/login' element={<Login />} />


      <Route path='/' element={<Layout />}>        
       
        {/* Profile */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />


        {/* User Routes */}
        <Route index element={<Dashboard />} />

        {/* Meetings */}
        <Route path='meetings'>
          <Route index element={<MeetingsIndex />} />
          {/* <Route path='create' element={<MeetingCreate />} />
          <Route path=':id' element={<MeetingView />} />
          <Route path=':id/edit' element={<MeetingEdit />}  /> */}
        </Route>
        <Route index element={<Dashboard />} />

        {/* Cases */}
        <Route path='cases'>
          <Route index element={<CasesIndex />} />     
          <Route path='create' element={<CasesCreate />} />
          <Route path='view/:id' element={<CasesEdit />} />
          <Route path='edit/:id' element={<CasesEdit />} />
        </Route>
        
        {/* Clients */}
        <Route path='clients'>
          <Route index element={<ClientsIndex />} />
          <Route path='create' element={<ClientsCreate />} />
          <Route path='view/:id' element={<ClientsEdit />} />
          <Route path='edit/:id' element={<ClientsEdit />} />
        </Route>
             
      </Route>

      {/* Admin Route */}
      <Route path='/admin' element={<Layout />}>

        {/* User Routes */}
        <Route index element={<AdminDashboard />} />

        {/* Meetings */}
        <Route path='meetings'>
          <Route index element={<MeetingsIndex />} />
          {/* <Route path='create' element={<MeetingCreate />} />
          <Route path=':id' element={<MeetingView />} />
          <Route path=':id/edit' element={<MeetingEdit />}  /> */}
        </Route>

        {/* Lawyers */}
        <Route path='lawyers'>
          <Route index element={<LawyersIndex />} />     
          <Route path='create' element={<LawyersCreate />} />
          <Route path='edit/:id' element={<LawyersEdit />} />
          <Route path='view/:id' element={<LawyersEdit />} />
        </Route>

        {/* Cases */}
        <Route path='cases'>
          <Route index element={<CasesIndex />} />     
          <Route path='create' element={<CasesCreate />} />
          <Route path='view/:id' element={<CasesEdit />} />
          <Route path='edit/:id' element={<CasesEdit />} />
        </Route>
        
        {/* Clients */}
        <Route path='clients'>
          <Route index element={<ClientsIndex />} />
          <Route path='create' element={<ClientsCreate />} />
          <Route path='view/:id' element={<ClientsEdit />} />
          <Route path='edit/:id' element={<ClientsEdit />} />
        </Route>
             
      </Route>

    </Routes>
  )
}

export default AppRoutes