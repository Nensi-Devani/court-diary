import React from 'react'

const AdminDashboardCard = ({ title, value, icon, bgColor, suffix }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="info-box">
        
        <span className={`info-box-icon ${bgColor} elevation-1`}>
          <i className={icon}></i>
        </span>

        <div className="info-box-content">
          <span className="info-box-text">{title}</span>

          <span className="info-box-number">
            {value}
            {suffix && <small> {suffix}</small>}
          </span>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboardCard