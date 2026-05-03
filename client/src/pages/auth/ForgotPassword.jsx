// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/forgotpassword", { email: formData.email });
      toast.success("Temporary password sent to your email!");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send password");
    }
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
                  Send New Password
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