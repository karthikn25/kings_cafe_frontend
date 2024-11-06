import React, { useState } from 'react';
import './Forget.css';
import { useDispatch, useSelector } from 'react-redux';
import { forget } from '../../Redux/actions/userAction';

export default function Forget() {
  const [credential, setCredential] = useState({
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value
    });
  };

  const handleForget = (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions
    setLoading(true);
    setSuccess(""); // Clear previous success message

    dispatch(forget({ email: credential.email }))
      .then(() => {
        setSuccess("Password reset link sent to your email!");
      })
      .catch((err) => {
        console.error("Error sending reset link:", err);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div id='forget'>
      <div className="row" id='forget-form-row'>
        <h3>FORGET PASSWORD</h3>
        <div id='forget-form'>
          <form onSubmit={handleForget}>
            <div className="form-floating mb-1" id="forget-field">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="johndoe@gmail.com"
                name="email" // Set the name attribute to "email"
                value={credential.email} // Bind the value to credential.email
                onChange={handleChange} // Use handleChange for input change
                required // Make the input required
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div id='forget-btn'>
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "UPDATE"}
              </button>
            </div>
          </form>
          {error && <div id='error'>{error}</div>} {/* Display error if exists */}
          {success && <div id='success'>{success}</div>} {/* Display success message */}
        </div>
      </div>
    </div>
  );
}
