import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom';

export default function Signup() {
  const [show,setShow]=useState();

  const toggle = ()=>setShow(!show);

  return (
    <div id='signup'>
    <div className='row'>
    <div className='col-6' id='signup-msg'>
    <h2>HEALTHY</h2>
    <h2>TASTE</h2>
    <h4>HEALTHIER & TASTIER MEALS</h4>
    </div>
    <div className='col-6' id='signup-form'>
    <h5>CREATE ACCOUNT</h5>
    <form>
    <div className="form-floating mb-1" id="signup-field">
      <input
        type="text"
        className="form-control"
        id="floatingInput"
        placeholder="john doe"
      />
      <label for="floatingInput">Username</label>
    </div>
    <div className="form-floating mb-1" id="signup-field">
      <input
        type="email"
        className="form-control"
        id="floatingInput"
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
      />
      <label for="floatingPassword">Password</label>
    </div>
    <div className="signup-show">
      <input type="checkbox" onClick={toggle}/> Show
    </div>
  </form>
  <div id='signup-btn'>
  <button>REGISTER</button>
  </div>
  <div id='signup-nav'>
  <p>ALREADY HAVE AN ACCOUNT?<Link to={"/"}>LOGIN</Link></p>
  </div>
    </div>
    </div>
    </div>
  )
}
