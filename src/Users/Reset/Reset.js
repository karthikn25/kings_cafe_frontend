import React, { useState } from "react";
import "./Reset.css";
import { URL } from "../../Server";
import { useNavigate, useParams } from "react-router-dom";

export default function Reset() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [show, setShow] = useState();

  const navigate = useNavigate();

  const {token,id} = useParams();
  console.log(id);

  const toggle = () => setShow(!show);

  const handleReset = async (e) => {
    const userData = {
      password
    }
    e.preventDefault();
    if (password === confirmPassword) {
      
      const res = await fetch(`${URL}/user/reset-password/${id}/${token}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!data.status) {
        setError(data.message);
        setSuccess("");
      } else {
        setSuccess(data.message);
        setError("");
        setTimeout(() => {
          navigate("/");
        },2000);
      }
    } else {
      setError("Wrong Password");
      setSuccess("");
    }
  };

  return (
    <div id="reset">
      <div className="row">
        <div className="col" id="reset-msg">
          <h3>CHANGE YOUR</h3>
          <h6>DELICIOUS FOOD</h6>
        </div>
      </div>
      <div className="row">
        <div className="col" id="reset-form">
          <div id="reset-form-field">
            <div className="form-floating" id="reset-field">
              <input
                type={!show ? "password" : "text"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="reset-show">
              <input type="checkbox" onClick={toggle} /> Show
            </div>
            <div className="form-floating" id="reset-field">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
          </div>
        </div>
        <div id="reset-btn">
          <button onClick={handleReset}>CHANGE</button>
        </div>
        {error ? (
          <div id="error">{error}</div>
        ) : (
          <div id="success">{success}</div>
        )}
      </div>
    </div>
  );
}
