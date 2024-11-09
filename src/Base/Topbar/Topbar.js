import React, { useEffect, useState } from "react";
import "./Topbar.css";
import img from "../../Images/cafe logo.png";
import img1 from "../../Images/PROFILE.jpg";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../Redux/actions/userAction";

export default function Topbar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState();

  const { userInfo, error } = useSelector((state) => state.user); // Access userInfo from Redux state
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(id)); // Fetch user data from the API when the component mounts
    }
  }, [dispatch, id]);

  const handleSearch = async () => {
    navigate(`/search/${keyword}`);
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
              <input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <i className="bx bx-search-alt-2" onClick={handleSearch}></i>
            </div>
          </div>
          <div className="col-6" id="topbar-end">
            <div id="topbar-nav" onClick={() => navigate(`/home/${token}`)}>
              <p> HOME</p>
              <i className="bx bx-home"></i>
            </div>

            <div id="topbar-logout">
              <button onClick={handleLogout}>LOGOUT</button>
            </div>
            <div id="topbar-profile">
              {/* Display user's avatar if available, otherwise fallback to the default avatar */}
              <img
                src={userInfo?.user?.avatar || img1} // Use userInfo from Redux store
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
