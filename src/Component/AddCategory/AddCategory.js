import React, { useEffect, useState } from "react";
import "./AddCategory.css";
import Base from "../../Base/Base";
import img from "../../Images/a.jpg";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";

export default function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    picture: null,
  });
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  });

  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setCategory({
        ...category,
        picture: files[0],
      });
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", category.name);
    if (category.picture) {
      data.append("picture", category.picture);
    }
    const res = await fetch(`${URL}/category/create`, {
      method: "POST",
      body: data,
      headers: {
        "x-auth-token": token,
      },
    });
    const data1 = await res.json();
    console.log(data1);
    if (!data1.category) {
      setError(data1.message);
      setSuccess("");
    } else {
      setSuccess(data1.message);
      setError("");
      setTimeout(() => {
        navigate(`/home/${token}`);
      });
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
                <img src={img} alt="img" />
                <input type="file" onChange={handleChange} name="picture" />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={handleChange}
                  value={category.name}
                />
              </div>

              <div id="add-btn">
                <button onClick={handleAddCategory}>ADD</button>
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
