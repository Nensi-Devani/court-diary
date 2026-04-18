// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Forgot Password Email:', formData.email);

    alert('Password reset link sent (demo)');
  };

  return (
    <div className="login-box mx-auto my-5">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <span className="h1">
            <b>Court</b>Diary
          </span>
        </div>

        <div className="card-body">
          <p className="login-box-msg">
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row">

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                setFormData={setFormData}
                className="col-12"
                required
              />

              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Send Reset Link
                </button>
              </div>

            </div>
          </form>

          <p className="mb-0 text-center">
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;