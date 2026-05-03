import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";

export default function CheckEmail() {
  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <MdMarkEmailRead style={{ fontSize: "4rem", color: "var(--primary)", marginBottom: "1rem" }} />
        <h2 className="auth-title">Check your email</h2>
        <p className="auth-subtitle" style={{ marginBottom: "1.5rem" }}>
          We've sent a verification link to your email address. Please click the button in the email to verify your account.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ width: "100%" }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
