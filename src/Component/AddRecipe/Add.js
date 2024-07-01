import React, { useEffect, useState } from "react";
import "./Add.css";
import Base from "../../Base/Base";
import img from "../../Images/a.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../Server";

export default function Add() {
  const [foodDetails, setFoodDetails] = useState({
    foodName: "",
    price: "",
    photo: null,
    details: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  });

  const token = sessionStorage.getItem("token");
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFoodDetails({
        ...foodDetails,
        photo: files[0],
      });
    } else {
      setFoodDetails({
        ...foodDetails,
        [name]: value,
      });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("foodName", foodDetails.foodName);
    data.append("price", foodDetails.price);
    data.append("details", foodDetails.details);
    if (foodDetails.photo) {
      data.append("photo", foodDetails.photo);
    }

    const res = await fetch(`${URL}/food/create/${id}`, {
      method: "POST",
      body: data,
      headers: {
        "x-auth-token": token,
      },
    });
    const data1 = await res.json();
    console.log(data1);
    if (!data1.food) {
      setError(data1.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess(data1.message);
      setTimeout(() => {
        navigate(`/home/${token}`);
      }, 2000);
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
                <img src={img} alt="" />
                <input type="file" onChange={handleChange} name="photo" />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="name"
                  name="foodName"
                  onChange={handleChange}
                  value={foodDetails.foodName}
                />
              </div>
              <div id="add-field">
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={foodDetails.price}
                />
              </div>
              <div id="add-field">
                <textarea
                  type="text"
                  placeholder="Details of Recipe"
                  name="details"
                  onChange={handleChange}
                  value={foodDetails.details}
                />
              </div>
              <div id="add-btn">
                <button onClick={handleCreate}>ADD</button>
              </div>
              {error ? (
                <div id="error">{error}</div>
              ) : (
                <div id="success">{success}</div>
              )}
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
