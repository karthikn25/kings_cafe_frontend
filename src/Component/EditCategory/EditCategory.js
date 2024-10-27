import React from 'react'
import Base from '../../Base/Base'
import img from "../../Images/a.jpg";

export default function EditCategory() {

    

  return (
    <div id="add">
      <Base>
        <div id="add-container">
          <h3>EDIT CATEGORY</h3>
          <div id="add-box-container">
            <div id="add-box">
              <div id="add-img">
                <img src={img} alt="img" />
                <input type="file" onChange={"handleChange"} name="picture" />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={"handleChange"}
                  value={"category.name"}
                />
              </div>

              <div id="add-btn">
                <button onClick={"handleAddCategory"}>ADD</button>
              </div>
            {  /*{error ? (
                <div id="error">{error}</div>
              ) : (
                <div id="success">{success}</div>
              )}*/}
            </div>
          </div>
        </div>
      </Base>
    </div>
  )
}
