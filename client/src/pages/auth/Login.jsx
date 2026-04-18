import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  localStorage.removeItem('email')
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // store email for role detection
    localStorage.setItem('email', formData.email);

    console.log(formData);
    if(formData.email == 'ndevani894@rku.ac.in')
      navigate('/admin');
    else
    navigate('/');
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
          <p className="login-box-msg">Sign in to start your session</p>

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

              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                setFormData={setFormData}
                className="col-12"
                required
              />

              <div className="col-8 mb-3">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={formData.remember}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        remember: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>

              {/* <div className="col-4 mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div> */}

            </div>
          </form>

          <div className="social-auth-links text-center mt-2 mb-3">
            <button onClick={handleSubmit} className="btn btn-block btn-primary">
              Sign in
            </button>
            <small>OR</small>
            <button className="btn btn-block btn-danger">
              Sign in with Google
            </button>
          </div>

          <p className="mb-1">
            <Link to="/forgot-password">I forgot my password</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              Register a new membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login