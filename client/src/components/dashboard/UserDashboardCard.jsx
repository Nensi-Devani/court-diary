import React from 'react'

const UserDashboardCard = ({ count, title, bgColor, icon, link, onClick }) => {
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box ${bgColor}`}>
        <div className="inner">
          <h3>{count}</h3>
          <p>{title}</p>
        </div>

        <div className="icon">
          <i className={icon}></i>
        </div>

        <a
          href={link || "#"}
          className="small-box-footer"
          onClick={(e) => {
            e.preventDefault();
            onClick && onClick();
          }}
        >
          More info <i className="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>
  )
}

export default UserDashboardCard