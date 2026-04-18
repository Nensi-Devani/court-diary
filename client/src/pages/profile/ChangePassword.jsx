import React, { useState } from 'react'
import FormInput from '../../components/form/FormInput'
import userImg from '../../assets/images/user.jpg'

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    officeContact: '+91 3456796845',
    officeAddress: 'Ahemdabad , Gujrat',
    workEmail: 'advnina345@gmail.com',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      
      {/* Profile Card */}
      <div className="card card-primary card-outline text-center">
        <div className="card-body box-profile">
          
          <img
            className="profile-user-img img-fluid img-circle"
            src={userImg}
            alt="User"
            style={{ width: '100px', height: '100px' }}
          />

          <h3 className="profile-username mt-2">Nancy Devani</h3>
          <p className="text-muted">Criminal Lawyer</p>

          <hr />

          <div className="text-left px-2">
            <p><strong>Email</strong>
              <span className="float-right text-primary">nina23@gmail.com</span>
            </p>
            <hr />

            <p><strong>Mobile No</strong>
              <span className="float-right text-primary">+91 - 5433456867</span>
            </p>
            <hr />

            <p><strong>Experience</strong>
              <span className="float-right text-primary">4 years</span>
            </p>
          </div>

        </div>
      </div>

      {/* About Me Form */}
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          About Me
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <FormInput
                label="Old Password"
                name="officeContact"
                value=''
                setFormData={setFormData}
                className="col-12"
                required
              />

              <FormInput
                label="New Password"
                name="officeAddress"
                value=''
                setFormData={setFormData}
                className="col-12"
                required
              />

              <FormInput
                label="Re-type New Password"
                name="workEmail"
                type="email"
                value=''
                setFormData={setFormData}
                className="col-12"
                required
              />

              <div className="col-12 mt-2">
                <button type="submit" className="btn btn-primary btn-block">
                  Save
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default ChangePassword