import React, { useState } from 'react'
import Base from '../../Base/Base'
import img from "../../Images/a.jpg";


export default function EditFood() {

  const [loading,setLoading]=useState(false);

  const [credential,setCredential]=useState({
    foodName:"",
    price:"",
    photo:"",
    details:""
  })

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

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("foodName", credential.foodName);
    data.append("price", credential.price);
    data.append("details", credential.details);
    if (credential.photo) {
      data.append("photo", credential.photo);
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
        <h3>EDIT RECIPES</h3>
        <div id="add-box-container">
          <div id="add-box">
            <div id="add-img">
              <img src={img} alt="" />
              <input type="file" onChange={"handleChange"} name="photo" />
            </div>
            <div id="add-field">
              <input
                type="text"
                placeholder="name"
                name="foodName"
                onChange={"handleChange"}
                value={"foodDetails.foodName"}
              />
            </div>
            <div id="add-field">
              <input
                type="number"
                placeholder="Price"
                name="price"
                onChange={"handleChange"}
                value={"foodDetails.price"}
              />
            </div>
            <div id="add-field">
              <textarea
                type="text"
                placeholder="Details of Recipe"
                name="details"
                onChange={"handleChange"}
                value={"foodDetails.details"}
              />
            </div>
            <div id="add-btn">
              <button onClick={"handleCreate"}>UPDATE</button>
            </div>
            {/*
                {error ? (
                    <div id="error">{error}</div>
                  ) : (
                    <div id="success">{success}</div>
                  )}*/
            }
           
          </div>
        </div>
      </div>
    </Base>
  </div>
  )
}
