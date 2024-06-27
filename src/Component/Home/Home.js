import React, { useEffect, useState } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";

export default function Home() {
  const navigate=useNavigate();
  const token = sessionStorage.getItem("token");
  const [category,setCategory]=useState([])

  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      navigate("/",{replace:true})
    }
    handleCategory()
  })

  const handleCategory=async()=>{
    const res = await fetch(`${URL}/category/get`,{
      method:"GET",
      headers:{
        "x-auth-token":token
      }
    })
    const data = await res.json();
    setCategory(data.category)

  }
  const handleRemove = async(id)=>{
    const res = await fetch(`${URL}/category/remove/${id}`,{
      method:"DELETE",
      headers:{
        "x-auth-token":token
      }
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <div id="home">
      <Base>
        <div id="home-container">
          <div className="category">
            <h3>Category</h3>
            <div id="item-container">
            {
              category && category.map((d)=>(
                <div id="item-box">
                <div className="f-img">
                  <img src={d.picture} alt="food" />
                </div>
                <div id="f-detail">
                  <h6>{d.name}</h6>
                  <p onClick={()=>handleRemove(d._id)}>REMOVE</p>
                </div>
              </div>
              ))
            }
            </div>
          </div>
         
        </div>
      </Base>
    </div>
  );
}
