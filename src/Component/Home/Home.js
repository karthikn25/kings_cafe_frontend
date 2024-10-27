import React, { useEffect, useState } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryGet } from "../../Redux/actions/categoryAction";
import img from "../../Images/add image.jpg";
import Loading from "../../Base/Loader/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { categoryInfo, error } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  // Fetch categories
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        await dispatch(categoryGet());
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [dispatch]);

  return (
    
     <div id="home">
      <Base>

        <div id="home-container">
          <div className="category">
            <h3>Category</h3>
             {loading ? <Loading/> : 
            <div id="item-container">
              {

                categoryInfo.category &&
                categoryInfo.category.map((d) => (
                  <div
                    key={d._id} // Add key for mapping
                    id="item-box"
                    onClick={() => navigate(`/foodlist/${d.name}/${d._id}/${token}`)}
                  >
                    <div className="f-img">
                      <img src={d.picture} alt={d.name} />
                    </div>
                    <div id="f-detail">
                      <h6>{d.name}</h6>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                    <p style={{color:"blue"}}><i class='bx bx-edit-alt'></i> Edit</p>
                    <p style={{color:"red"}}><i class='bx bx-trash' ></i> Remove</p>
                    </div>
                  </div>
             )) }
               
              <div id="item-box" onClick={() => navigate("/addCategory")}>
                <div className="f-img">
                  <img src={img} alt="Add Category" />
                </div>
                <div id="f-detail" className="c_list-detail">
                  <h6>ADD Category</h6>
                </div>
              </div>
            
            </div>
             }
          </div>
        </div>
      </Base>
    </div>
  
    
  
  );
}
