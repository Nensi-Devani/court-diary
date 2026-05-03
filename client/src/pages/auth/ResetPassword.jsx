import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, otp, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put("http://localhost:5000/api/auth/resetpassword", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Password reset successfully!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.error || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card">
        <h2 className="auth-title">Enter OTP</h2>
        <p className="auth-subtitle">We've sent an OTP to your email</p>

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
              readOnly={!!location.state?.email}
            />
          </div>

          <div className="input-group">
            <label htmlFor="otp">6-Digit OTP</label>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={onChange}
              required
              placeholder="123456"
              maxLength="6"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem" }}>
          Back to <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
