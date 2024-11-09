import img from "../../Images/PROFILE.jpg";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getSingleUser } from "../../Redux/actions/userAction";

export default function Profile() {
  const [credential, setCredential] = useState({
    username: "",
    avatar: null, // This will store the avatar file
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const { userInfo, error, loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
    if (userId) {
      dispatch(getSingleUser(userId)); // Fetch user info when component mounts
    }
  }, [dispatch, userId, token, navigate]);

  useEffect(() => {
    if (userInfo) {
      setCredential({
        username: userInfo.username || "", // Set the username from the userInfo
        avatar: userInfo.avatar || null, // Set the avatar from the userInfo
      });
    }
  }, [userInfo]); // Update local state whenever userInfo from Redux changes

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setCredential({
        ...credential,
        avatar: files[0], // Update avatar with the newly selected file
      });
    } else {
      setCredential({
        ...credential,
        [name]: value, // Update username
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", credential.username); // Append username to FormData

    // If the user selected a new avatar, append it to FormData
    if (credential.avatar) {
      data.append("avatar", credential.avatar);
    }

    setLoading(true);

    try {
      // Dispatch the update action and get the response
      const result = await dispatch(editUser(data, userId));
      console.log("Edit User Result:", result); // Log the result to inspect the response

      if (result && result.user) {
        // Re-fetch the updated user info and update local state
        dispatch(getSingleUser(userId)); // Ensure this updates the Redux state with the new user info
        setLoading(false);
        setSuccess("Profile updated successfully.");
        setTimeout(() => {
          navigate(`/home/${token}`);
        }, 1000);
      } else {
        setLoading(false);
        setSuccess("Failed to update profile.");
      }
    } catch (error) {
      setLoading(false);
      setSuccess("");
      console.error("Error updating profile:", error);
    }
  };

  // Use cache busting with new timestamp when user avatar is updated
  const avatarPreview =
    credential.avatar
      ? URL.createObjectURL(credential.avatar) // Preview the selected avatar
      : credential.avatar ||
        userInfo?.user.avatar + "?t=" + new Date().getTime() ||
        img; // Fallback to userInfo avatar with cache busting

  return (
    <div id="profile">
      <Base>
        <div id="profile-box-container">
          <div id="profile-box">
            <div id="profile-img">
              <img src={avatarPreview} alt="profile" />
              <input type="file" onChange={handleChange} name="avatar" />
            </div>
            <div id="profile-field">
              <input
                type="text"
                placeholder="Username"
                value={credential.username}
                onChange={handleChange}
                name="username"
              />
            </div>
            <div id="profile-btn">
              <button onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "UPDATE"}
              </button>
            </div>
            {!error ? (
              <div id="success">{success}</div>
            ) : (
              <div id="error">{error}</div>
            )}
          </div>
        </div>
      </Base>
    </div>
  );
}
