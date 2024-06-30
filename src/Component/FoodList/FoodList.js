import React, { useEffect, useState } from "react";
import "./FoodList.css";
import Base from "../../Base/Base";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../Server";
import { MdOutlineFastfood, MdOutlineNoFood } from "react-icons/md";
import img from '../../Images/add image.jpg'

export default function FoodList() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const [food, setFood] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetFood();
  }, []);

  const handleGetFood = async () => {
    const res = await fetch(`${URL}/food/getall/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });
    const data = await res.json();
    setFood(data.food);
    console.log(data.food); // Log the data to verify the status field
  };

  const toggleImageStatus = async (foodId) => {
    const res = await fetch(`${URL}/food/toggle/${foodId}`, {
      method: "PUT",
      headers: {
        "x-auth-token": token,
      },
    });
    const updatedFood = await res.json();
    console.log(updatedFood);
    setFood((prevFood) =>
      prevFood.map((item) =>
        item._id === updatedFood._id ? updatedFood : item
      )
    );
  };

  const handleRemove = async (foodId) => {
    // Add your remove functionality here
      alert("sure you remove food")
    const res = await fetch(`${URL}/food/remove/${foodId}`,{
      method:"DELETE",
      headers:{
        "x-auth-token":token
      }
    })
    const data = await res.json();
    setFood((prevFood) =>
      prevFood.map((item) =>
         item
      )
    );
   
    
    console.log(data);
  };

  return (
    <div id="home">
      <Base>
        <div id="home-container">
          <div className="category">
            <h3>Recipe List</h3>
            <div id="item-container">
              {food &&
                food.map((d) => (
                  <div id="item-box" key={d._id}>
                  
              <div className="f-img">
                      <img src={d.photo} 
                      alt={d.foodName}  className={!d.status ? 'blurred' : ''}
                      />
                      <p style={{color:"red"}}>{!d.status ? "Out of stock":""}</p>

                    </div>
                    <div className="f_list_detail">
                      <h6>{d.foodName}</h6>
                      <div id="f-btn">
                        {d.status ? (
                          <MdOutlineFastfood style={{color:"green"}}
                            onClick={() => toggleImageStatus(d._id)}
                          />
                        ) : (
                          <MdOutlineNoFood
                          style={{color:"red"}}
                            onClick={() => toggleImageStatus(d._id)}
                          />
                        )}
                        <i
                          className="bx bx-trash"
                          style={{color:"red"}}
                          onClick={() => handleRemove(d._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
                <div id="item-box" onClick={()=>navigate(`/${id}/addFood`)}>
                 <div className="f-img">
                  <img src={img} alt="add"/>
                  </div>
                    <div id="f-detail" className="f_list_detail">
                    <h6>ADD RECIPE</h6>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
