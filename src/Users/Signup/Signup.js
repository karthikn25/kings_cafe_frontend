import React, { useState } from "react";
import "./Signup.css";
import { URL } from "../../Server";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [show, setShow] = useState();
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const userDetails = {
      name,
      email,
      password,
    };

    const res = await fetch(`${URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (!data.token) {
      setError(data.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const toggle = () => setShow(!show);

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
          <form>
            <div className="form-floating mb-1" id="signup-field">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="john doe"
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-1" id="signup-field">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating" id="signup-field">
              <input
                type={!show ? "password" : "text"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="signup-show">
              <input type="checkbox" onClick={toggle} /> Show
            </div>
          </form>
          <div id="signup-btn">
            <button onClick={handleSignup}>REGISTER</button>
          </div>
          <div id="signup-nav">
            <p>
              ALREADY HAVE AN ACCOUNT?<Link to={"/"}>LOGIN</Link>
            </p>
          </div>
          {error ? (
            <div id="error">{error}</div>
          ) : (
            <div id="success">{success}</div>
          )}
        </div>
      </div>
    </div>
  );
}
