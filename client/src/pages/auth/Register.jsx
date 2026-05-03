// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/check-email');
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/google", {
          token: tokenResponse.credential || tokenResponse.access_token,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem('email', res.data.user.email);
        toast.success("Google Login successful!");
        
        if(res.data.user.role === 'admin')
          navigate('/admin');
        else
          navigate('/');
      } catch (err) {
        toast.error("Google Login failed");
      }
    },
    onError: () => toast.error("Google Login failed"),
  });

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
                <button type="button" onClick={() => handleGoogleLogin()} className="btn btn-block btn-danger">
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