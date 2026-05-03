import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        localStorage.setItem("token", res.data.token);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card" style={{ textAlign: "center" }}>
        {status === "loading" && (
          <>
            <h2 className="auth-title">Verifying Email...</h2>
            <p className="auth-subtitle">Please wait while we verify your account.</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <h2 className="auth-title" style={{ color: "var(--success)" }}>Email Verified!</h2>
            <p className="auth-subtitle">Your account has been successfully verified.</p>
            <Link to="/" className="btn btn-primary" style={{ width: "100%" }}>
              Go to Dashboard
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="auth-title" style={{ color: "var(--danger)" }}>Verification Failed</h2>
            <p className="auth-subtitle">The link may be invalid or expired.</p>
            <Link to="/login" className="btn btn-primary" style={{ width: "100%" }}>
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
