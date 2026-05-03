import React from 'react'

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f3f4f6' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#4f46e5' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
      <a href="/" style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>Go Home</a>
    </div>
  )
}

export default NotFound;
