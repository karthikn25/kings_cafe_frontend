import React, { useEffect, useState } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryGet, categoryRemove } from "../../Redux/actions/categoryAction";
import img from "../../Images/add image.jpg";
import Loading from "../../Base/Loader/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Set initial loading to true
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

  const handleRemove = (catId) => {
    if (window.confirm("Are you sure you want to remove this category?")) {
      dispatch(categoryRemove(catId))
        .then(() => {
          dispatch(categoryGet());
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          alert("Failed to delete category. Please try again.");
        });
    }
  };

  return (
    <div id="home">
      <Base>
        <div id="home-container">
          <div className="category">
            <h3>Category</h3>
            {loading ? (
              <Loading />
            ) : (
              <div id="item-container">
                {Array.isArray(categoryInfo.category) && categoryInfo.category.length > 0 ? (
                  categoryInfo.category.map((d) => (
                    <div key={d._id} id="item-box">
                      <div onClick={() => navigate(`/foodlist/${d.name}/${d._id}/${token}`)}>
                        <div className="f-img">
                          <img src={d.picture} alt={d.name} />
                        </div>
                        <div id="f-detail">
                          <h6>{d.name}</h6>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <p style={{ color: "blue" }} onClick={() => navigate(`/edit/${d._id}/${token}`)}>
                          <i className='bx bx-edit-alt'></i> Edit
                        </p>
                        <p style={{ color: "red" }} onClick={() => handleRemove(d._id)}>
                          <i className='bx bx-trash'></i> Remove
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No categories available.</p>
                )}
                <div id="item-box" onClick={() => navigate("/addCategory")}>
                  <div className="f-img">
                    <img src={img} alt="Add Category" />
                  </div>
                  <div id="f-detail" className="c_list-detail">
                    <h6>ADD Category</h6>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Base>
    </div>
  );
}
