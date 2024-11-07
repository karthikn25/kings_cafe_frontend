import React, { useState, useEffect } from "react";
import "./Add.css";
import Base from "../../Base/Base";
import img from "../../Images/a.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { foodPost } from "../../Redux/actions/foodAction";

export default function Add() {
  const [credential, setCredential] = useState({
    foodName: "",
    price: "",
    photo: null,
    details: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { foodDetails, error: reduxError } = useSelector((state) => state.food);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Handle input changes (text, number, file)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setCredential({
        ...credential,
        photo: files[0],
      });
    } else {
      setCredential({
        ...credential,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("foodName", credential.foodName);
    data.append("price", credential.price);
    data.append("details", credential.details);
    if (credential.photo) {
      data.append("photo", credential.photo);
    }

    setLoading(true);
    setError(""); // Clear previous errors
    setSuccess(""); // Clear success message before new submission

    try {
      // Dispatching the action to post food details
      await dispatch(
        foodPost({
          credential: data,
          categoryInfo: id,
          userInfo: localStorage.getItem("id"),
        })
      );

      // Assuming foodPost dispatches success action
      setSuccess("Food added successfully!");
      setLoading(false);
      setCredential({
        foodName: "",
        price: "",
        photo: null,
        details: "",
      });
      
      // Redirect after a short delay to allow success message display
      setTimeout(() => {
        navigate(`/home/${token}`);
      }, 1500); // Delay before redirecting to give the user a chance to see the success message
    } catch (error) {
      setLoading(false);
      setError(reduxError || "An error occurred while adding the food.");
    }
  };

  return (
    <div id="add">
      <Base>
        <div id="add-container">
          <h3>ADD RECIPES</h3>
          <div id="add-box-container">
            <div id="add-box">
              <div id="add-img">
                <img src={img} alt="Food" />
                <input type="file" onChange={handleChange} name="photo" />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="Name"
                  name="foodName"
                  onChange={handleChange}
                  value={credential.foodName}
                />
              </div>
              <div id="add-field">
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={credential.price}
                />
              </div>
              <div id="add-field">
                <textarea
                  type="text"
                  placeholder="Details of Recipe"
                  name="details"
                  onChange={handleChange}
                  value={credential.details}
                />
              </div>
              <div id="add-btn">
                <button onClick={handleCreate} disabled={loading}>
                  {loading ? "Adding..." : "ADD"}
                </button>
              </div>

              {/* Conditionally render success or error message */}
              {success && <div id="success">{success}</div>}
              {error && <div id="error">{error}</div>}
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
