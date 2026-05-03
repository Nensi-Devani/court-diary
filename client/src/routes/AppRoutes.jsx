import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from '../layouts/Index'

import Dashboard from '../pages/dashboard/Index'
import AdminDashboard from '../pages/admin/dashboard/Index'

import LawyersIndex from '../pages/admin/lawyers/Index'
import LawyersCreate from '../pages/admin/lawyers/Create'
import LawyersEdit from '../pages/admin/lawyers/Edit'
import LawyersView from '../pages/admin/lawyers/View'

import MeetingsIndex from '../pages/meetings/Index'
import MeetingsCreate from '../pages/meetings/Create'
import MeetingsEdit from '../pages/meetings/Edit'

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

import Register from '../pages/auth/Register'
import CheckEmail from '../pages/auth/CheckEmail'
import VerifyEmail from '../pages/auth/VerifyEmail'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import NotFound from '../pages/NotFound'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const AppRoutes = () => {
  return (
    <Routes>

      {/* Auth */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/check-email' element={<CheckEmail />} />
      <Route path='/verify-email/:token' element={<VerifyEmail />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      <Route path='/' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>        
       
       {/* Profile */}
        <Route path='profile'>
          <Route index element={<Profile />} />     
          <Route path='edit' element={<ProfileEdit />} />
          <Route path='change-password' element={<ProfileChangePassword />} />
        </Route>

        {/* User Routes */}
        <Route index element={<Dashboard />} />

        {/* Meetings */}
        <Route path='meetings'>
          <Route index element={<MeetingsIndex />} />
          <Route path='create' element={<MeetingsCreate />} />
          <Route path='edit/:id' element={<MeetingsEdit />} />
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

      {/* Admin Route */}
      <Route path='/admin' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>

        {/* User Routes */}
        <Route index element={<AdminDashboard />} />

        {/* Lawyers */}
        <Route path='lawyers'>
          <Route index element={<LawyersIndex />} />     
          <Route path='create' element={<LawyersCreate />} />
          <Route path='edit/:id' element={<LawyersEdit />} />
          <Route path='view/:id' element={<LawyersView />} />
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

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes