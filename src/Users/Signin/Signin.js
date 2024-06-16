import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";

export default function Signin() {
  const [show,setShow]=useState();

  const toggle = ()=>setShow(!show);

  return (
    <div id="signin">
      <div className="row" id="signin-row">
        <div className="col-6" id="signin-msg">
          <h2>HEALTHY</h2>
          <h2>TASTE</h2>
          <h6>HEAL THIER & TASTIER MEALS</h6>
        </div>
        <div className="col-6" id="signin-form">
          <h4>ENTER THE KITCHEN</h4>
          <form>
            <div className="form-floating mb-3" id="signin-field">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating" id="signin-field">
              <input
                type={!show ? "password" : "text"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="signin-show">
              <input type="checkbox" onClick={toggle}/> Show
            </div>
          </form>
          <div id="signin-btn">
            <button>LOGIN</button>
          </div>
          <div id="signin-forget">
                  <Link to={"/forget-password"}>FORGET PASSWORD</Link>
          </div>
          <div id="signin-nav">
            <p>
              DON'T HAVE AN ACCOUNT?<Link to={"/register"}>REGISTER</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
