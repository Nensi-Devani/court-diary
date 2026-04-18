// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Register Data:', formData);

    // ✅ store email (optional for role logic)
    localStorage.setItem('email', formData.email);

    navigate('/');
  };

  return (
    <div className="register-box mx-auto my-5">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <span className="h1">
            <b>Court</b>Diary
          </span>
        </div>

        <div className="card-body">
          <p className="login-box-msg">Register a new membership</p>

          <form onSubmit={handleSubmit}>
            <div className="row">

              <FormInput
                label="Name"
                name="name"
                value={formData.name}
                setFormData={setFormData}
                className="col-12"
                required
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                setFormData={setFormData}
                className="col-12"
                required
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                setFormData={setFormData}
                className="col-12"
                required
              />

              <FormInput
                label="Retype Password"
                name="retypePassword"
                type="password"
                value={formData.retypePassword}
                setFormData={setFormData}
                className="col-12"
                required
              />

              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
                <p className='text-center m-0'>OR</p>
                <button className="btn btn-block btn-danger">
                    Sign in with Google
                </button>
              </div>

            </div>
          </form>

          <p className="mb-0 text-center">
            <Link to="/login">I already have a membership</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;