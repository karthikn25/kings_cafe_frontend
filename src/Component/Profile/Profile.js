import img from "../../Images/PROFILE.jpg";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../Redux/actions/userAction";

export default function Profile() {
  const [credential, setCredential] = useState({
    username: "",
    avatar: null,  // This will store the avatar file
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
    // Pre-populate the profile with current user info
    if (userInfo) {
      setCredential({
        username: userInfo.username || "", // Assuming userInfo contains the 'username'
        avatar: userInfo.avatar || null, // Use the current avatar image from the userInfo
      });
    }
  }, [userInfo, navigate]);

  // Handle file input changes (avatar selection)
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

  // Handle form submission (profile update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", credential.username); // Append username to FormData

    // If the user selected a new avatar, append it to FormData
    if (credential.avatar) {
      data.append("avatar", credential.avatar);
    }

    setLoading(true);

    const userId = localStorage.getItem("id");

    try {
      const result = await dispatch(editUser(data, userId)); // Dispatch the update action
      setLoading(false);

      // Check if the response was successful
      if (result && result.success) {
        setSuccess("Profile updated successfully.");
        setErrorMessage("");
      } else {
        setSuccess("");
        setErrorMessage(result.message || "Failed to update profile.");
      }
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setErrorMessage("Error updating profile: " + error.message);
    }
  };

  // Generate image preview URL if there's an avatar selected
  const avatarPreview = credential.avatar
    ? URL.createObjectURL(credential.avatar) // Preview the selected avatar
    : credential.avatar // Use the existing avatar if there is one
    || img; // Fallback to default image if no avatar is selected

  return (
    <div id="profile">
      <Base>
        <div id="profile-box-container">
          <div id="profile-box">
            <div id="profile-img">
              {/* Dynamically update the image source based on the selected avatar */}
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
            {!error ?  <div id="success">{success}</div>:  <div id="error">{error}</div> }
           
          </div>
        </div>
      </Base>
    </div>
  );
}
