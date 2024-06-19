import React, { useEffect, useState } from "react";
import "./Topbar.css";
import img from "../../Images/cafe logo.png";
import img1 from "../../Images/PROFILE.jpg";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";

export default function Topbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const id = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");


  const handleLogout = ()=>{
   sessionStorage.clear()
   navigate("/")
  }

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const res = await fetch(`${URL}/user/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUserData(data.user);
    console.log(userData);
  };

  return (
    <div id="topbar">
      <div id="topbar-box">
        <div className="row">
          <div className="col-6" id="topbar-start">
            <div id="topbar-logo">
              <img src={img} alt="logo" />
            </div>
            <div id="topbar-search">
              <input type="text" placeholder="Search" />
              <i class="bx bx-search-alt-2"></i>
            </div>
          </div>
          <div className="col-6" id="topbar-end">
            <div id="topbar-nav" onClick={() => navigate(`/home/${token}`)}>
              <p> HOME</p>
              <i class="bx bx-home"></i>
            </div>
            <div id="topbar-nav" onClick={() => navigate("/add")}>
              <p>ADD+</p>
              <i class="bx bx-add-to-queue"></i>
            </div>
            <div id="topbar-logout">
              <button onClick={handleLogout}>LOGOUT</button>
            </div>
            <p></p>
            <div id="topbar-profile">
              <img
                src={userData ? userData.avatar : img1}
                alt="profile"
                onClick={() => navigate("/profile_edit")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
