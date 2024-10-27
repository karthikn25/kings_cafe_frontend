import React, { useEffect, useState } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";
import img from "../../Images/add image.jpg";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
   
   
  });

  // const handleCategory = async () => {
  //   const res = await fetch(`${URL}/category/get`, {
  //     method: "GET",
  //     headers: {
  //       "x-auth-token": token,
  //     },
  //   });
  //   const data = await res.json();
  //   setCategory(data.category);
  // };
  const handleRemove = async (id) => {
    const res = await fetch(`${URL}/category/remove/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.category) {
      alert("sure to remove this");
    }
  };
  return (
    <div id="home">
      <Base>
        <div id="home-container">
          <div className="category">
            <h3>Category</h3>
            <div id="item-container">
              {category &&
                category.map((d) => (
                  <div
                    id="item-box"
                    onClick={() => navigate(`/foodlist/${d._id}/${d.name}`)}
                  >
                    <div className="f-img">
                      <img src={d.picture} alt="food" />
                    </div>
                    <div id="f-detail">
                      <h6>{d.name}</h6>
                      {/*                 <p onClick={()=>handleRemove(d._id)}>REMOVE</p>
                       */}{" "}
                    </div>
                  </div>
                ))}
              <div id="item-box" onClick={() => navigate("/addCategory")}>
                <div className="f-img">
                  <img src={img} alt="food" />
                </div>
                <div id="f-detail" className="c_list-detail">
                  <h6>ADD Category</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
