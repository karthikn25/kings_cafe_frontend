import React, { useState } from "react";
import "./Signin.css";
import { URL } from "../../Server";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [show,setShow]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();

  const navigate = useNavigate();

  const handleSignin = async(e)=>{
    e.preventDefault()

    const userDetails = {
      email,
      password
    }
    const res = await fetch(`${URL}/user/login`,{
      method:"POST",
      body:JSON.stringify(userDetails),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(!data.token){
      setError(data.message)
      setSuccess('')
    }else{
      setError('')
      setSuccess(data.message)
      setTimeout(()=>{
        sessionStorage.setItem("token",data.token)
        sessionStorage.setItem('id',data.user._id)
        navigate(`/home/${data.token}`)
      })
    }
  }

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
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating" id="signin-field">
              <input
                type={!show ? "password" : "text"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="signin-show">
              <input type="checkbox" onClick={toggle}/> Show
            </div>
          </form>
          <div id="signin-btn">
            <button onClick={handleSignin}>LOGIN</button>
          </div>
          <div id="signin-forget">
            <Link to={"/forget-password"}>FORGET PASSWORD</Link>
          </div>
          <div id="signin-nav">
            <p>
              DON'T HAVE AN ACCOUNT?<Link to={"/register"}>REGISTER</Link>
            </p>
          </div>
          {
            error ? <div id="error">{error}</div> : <div id="success">{success}</div>
          }
        </div>
      </div>
    </div>
  );
}
