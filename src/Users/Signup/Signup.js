import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, verifyOtp } from "../../Redux/actions/userAction";

export default function Signup() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    dispatch(register(credential))
      .then(() => {
        setOtpSent(true);
        setSuccess("OTP sent to your email!");
      })
      .catch((err) => {
        console.error("Registration failed", err);
        setSuccess(""); // Clear success message on error
      })
      .finally(() => {
        setLoading(false); // Ensure loading is set to false after completion
      });
  };

  const toggle = () => setShow(!show);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    dispatch(verifyOtp({ otp, email: credential.email }))
      .then(() => {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          navigate("/"); // Navigate to sign-in page
        }, 1000);
      })
      .catch((err) => {
        console.error("OTP verification failed", err);
        setSuccess(""); // Clear success message on error
      })
      .finally(() => {
        setLoading(false); // Ensure loading is set to false after completion
      });
  };

  return (
    <div id="signup">
      <div className="row">
        <div className="col-6" id="signup-msg">
          <h2>HEALTHY</h2>
          <h2>TASTE</h2>
          <h4>HEALTHIER & TASTIER MEALS</h4>
        </div>
        <div className="col-6" id="signup-form">
          <h5>CREATE ACCOUNT</h5>
          {!otpSent ? (
            <form onSubmit={handleSignup}>
              <div className="form-floating mb-1" id="signup-field">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={credential.username}
                  onChange={handleChange}
                  placeholder="john doe"
                  required
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-1" id="signup-field">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={credential.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating" id="signup-field">
                <input
                  type={!show ? "password" : "text"}
                  className="form-control"
                  name="password"
                  value={credential.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="signup-show">
                <input type="checkbox" onClick={toggle} /> Show
              </div>
              <div id="signup-btn">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "REGISTER"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="form-floating mb-1" id="signup-field">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={credential.email}
                  readOnly
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-1" id="signup-field">
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
                <label htmlFor="otp">Enter OTP</label>
              </div>
              <div id="signup-btn">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "VERIFY OTP"}
                </button>
              </div>
            </form>
          )}
          <div id="signup-nav">
            <p>
              ALREADY HAVE AN ACCOUNT?<Link to={"/"}>LOGIN</Link>
            </p>
          </div>
          {error && <div id="error">{error}</div>}
          {success && <div id="success">{success}</div>}
        </div>
      </div>
    </div>
  );
}
