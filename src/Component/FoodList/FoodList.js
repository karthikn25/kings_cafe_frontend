import React, { useEffect, useState } from 'react';
import './FoodList.css';
import Base from '../../Base/Base';
import { useParams } from 'react-router-dom';
import { URL } from '../../Server';
import { MdOutlineFastfood,MdOutlineNoFood } from "react-icons/md";

export default function FoodList() {
    const {id} = useParams();
    const token=sessionStorage.getItem("token");
    const [food,setFood]=useState([]);

    useEffect(()=>{
        handleGetFood();
    })
    
    const handleGetFood = async()=>{
        const res = await fetch(`${URL}/food/getall/${id}`,{
            method:"GET",
            headers:{
                'x-auth-token':token
            }
        })
        const data = await res.json();
        setFood(data.food)

    }
  
    const handleRemove = async()=>{

    }

  return (
    <div id="home">
    <Base>
      <div id="home-container">
        <div className="category">
          <h3>Recipe List</h3>
          <div id="item-container">
          {
            food && food.map((d)=>(
              <div id="item-box">
              <div className="f-img">
                <img src={d.photo} alt="food" />
              </div>
              <div id="f-detail">
                <h6>{d.foodName}</h6>
                <div id='f-btn'>
                <MdOutlineFastfood />
                <MdOutlineNoFood />
                <i class='bx bx-trash' onClick={()=>handleRemove(d._id)}></i>
                <p></p>
                </div>
              </div>
            </div>
            ))
          }
          </div>
        </div>
       
      </div>
    </Base>
  </div>
    
  )
}
