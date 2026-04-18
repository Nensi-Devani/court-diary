import React from 'react'
import userImg from '../../assets/images/user.jpg'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      
      {/* Profile Card */}
      <div className="card card-primary card-outline text-center">
        <div className="card-body box-profile">
          
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src={userImg}
              alt="User profile"
              style={{ width: '100px', height: '100px' }}
            />
          </div>

          <h3 className="profile-username text-center mt-2">
            Nancy Devani
          </h3>

          <p className="text-muted text-center">
            Criminalc Lawyer
          </p>

          <hr />

          <div className="text-left px-2">
            <p className="mb-2">
              <strong>Email</strong>
              <span className="float-right text-primary">
                nina23@gmail.com
              </span>
            </p>

            <hr />

            <p className="mb-2">
              <strong>Mobile No</strong>
              <span className="float-right text-primary">
                5433456867
              </span>
            </p>

            <hr />

            <p className="mb-2">
              <strong>Experience</strong>
              <span className="float-right text-primary">
                4 years
              </span>
            </p>
          </div>

          <div className="d-flex mt-3">
            <Link to='/profile/edit' className="btn btn-primary col-md-6 mr-1">
              Edit
            </Link>
            <Link to='/profile/change-password' className="btn btn-primary col-md-6">
              Change Password
            </Link>
          </div>

        </div>
      </div>

      {/* Office Details */}
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          Office Details
        </div>

        <div className="card-body">

          <p className="mb-2">
            <i className="fas fa-phone-alt mr-2"></i>
            <strong>Office Contact</strong>
          </p>
          <p className="text-muted">+91 3456796845</p>

          <hr />

          <p className="mb-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            <strong>Office Address</strong>
          </p>
          <p className="text-muted">Ahemdabad , Gujrat</p>

          <hr />

          <p className="mb-2">
            <i className="fas fa-envelope mr-2"></i>
            <strong>Work Mail</strong>
          </p>
          <p className="text-muted">advnina345@gmail.com</p>

        </div>
      </div>

    </div>
  )
}

export default Profile