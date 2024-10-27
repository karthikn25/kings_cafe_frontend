import React, { useState } from "react";
import "./Reset.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../Redux/actions/userAction";

export default function Reset() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({
    password: "",
    confirmPassword: ""
  });

  const { error } = useSelector((state) => state.user);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token, id } = useParams();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (loading) return;

    if (credential.password !== credential.confirmPassword) {
      setSuccess(""); // Clear success message if passwords don't match
      return; // Early exit if passwords do not match
    }

    setLoading(true);
    dispatch(reset({ password: credential.password }, { id, token }))
      .then(() => {
        setSuccess("Password successfully changed!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
        setSuccess(""); // Clear success message on error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id="reset">
      <div className="row">
        <div className="col" id="reset-msg">
          <h3>CHANGE YOUR</h3>
          <h6>DELICIOUS FOOD</h6>
        </div>
      </div>
      <div className="row">
        <div className="col" id="reset-form">
          <form onSubmit={handleReset}>
            <div id="reset-form-field">
              <div className="form-floating" id="reset-field">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={credential.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="reset-show">
                <input type="checkbox" onClick={togglePasswordVisibility} /> Show
              </div>
              <div className="form-floating" id="reset-field">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={credential.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              </div>
            </div>
            <div id="reset-btn">
              <button type="submit" disabled={loading}>
                {loading ? "Changing..." : "CHANGE"}
              </button>
            </div>
          </form>
          {error && <div id="error">{error}</div>}
          {success && <div id="success">{success}</div>}
        </div>
      </div>
    </div>
  );
}
