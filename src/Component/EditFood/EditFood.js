import React from 'react'
import Base from '../../Base/Base'
import img from "../../Images/a.jpg";


export default function EditFood() {
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
