import React from "react";
import "./Topbar.css";
import img from "../../Images/cafe logo.png";
import img1 from "../../Images/PROFILE.jpg";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  
  return (
    <div id="topbar">
      <div id="topbar-box">
        <div className="row">
          <div className="col-6" id="topbar-start">
            <div id="topbar-logo">
              <img src={img} alt="logo" />
            </div>
            <div id="topbar-search">
              <input type="text" placeholder="Search"/><i class='bx bx-search-alt-2'></i>
            </div>
          </div>
          <div className="col-6" id="topbar-end">
          <div id="topbar-nav" onClick={()=>navigate("/home")}>
          <p> HOME</p>
         <i class='bx bx-home'></i>
          </div>
          <div id="topbar-nav" onClick={()=>navigate("/add")}>
          <p>ADD+</p>
          <i class='bx bx-add-to-queue'></i>
          </div>
          <div id="topbar-logout">
          <button>LOGOUT</button>
          </div>
          <div id="topbar-profile">
          <img src={img1} alt="profile" onClick={()=>navigate("/profile_edit")}/>

          </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
