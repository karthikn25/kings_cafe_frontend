import React, { useState } from "react";
import "./Signin.css";
import { URL } from "../../Server";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/actions/userAction";

export default function Signin() {
  const [loading,setLoading]=useState(false);
  const [show,setShow]=useState();
  const [credential,setCredential]=useState({
    email:"",
    password:"",

  })
  const dispatch = useDispatch();

  const {userInfo,error}=useSelector((state)=>state.user);

  const [success,setSuccess]=useState();

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setCredential({
      ...credential,
      [e.target.name]:e.target.value
    })
  }

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
        const result = await dispatch(login(credential));

        // Log the entire result for debugging
        console.log("Login result:", result);

        // Ensure the response structure is correct
        if (result && result.message === 'Login successfully') {
            localStorage.setItem("token", result.token);
            localStorage.setItem("id", result.user._id);
            navigate(`/home/${result.token}`);
        } else {
            // Log the error message from the response
            console.error("Login failed:", result.message || 'Unknown error');
        }
    } catch (error) {
        console.error("Login error:", error);
    }
};


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
                name="email"
                value={credential.email}
                onChange={handleChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating" id="signin-field">
              <input
                type={!show ? "password" : "text"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={credential.password}
                onChange={handleChange}
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
