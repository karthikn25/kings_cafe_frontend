import React, { useEffect } from "react";
import "./FoodList.css";
import Base from "../../Base/Base";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../Server";
import { MdOutlineFastfood, MdOutlineNoFood } from "react-icons/md";
import img from "../../Images/add image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryFood, toggleFoodStatus, deleteFood } from "../../Redux/actions/foodAction";
import Loading from "../../Base/Loader/Loading";

export default function FoodList() {
  const { c_id } = useParams();
  const dispatch = useDispatch();
  const { foods, error, loading } = useSelector((state) => state.food);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      dispatch(getCategoryFood(c_id)); // Initial fetch
    }

    const intervalId = setInterval(() => {
      dispatch(getCategoryFood(c_id)); 
    }, 10000); 

    // Cleanup interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [dispatch, navigate, token, c_id]);

  const handleToggleStatus = (foodId) => {
    dispatch(toggleFoodStatus(foodId))
      .then(() => dispatch(getCategoryFood(c_id)));
  };

  const handleRemove = (foodId) => {
    if (window.confirm("Are you sure you want to remove this food?")) {
        dispatch(deleteFood(foodId))
            .then(() => {
                dispatch(getCategoryFood(c_id)); // Refresh food list after deletion
            })
            .catch((error) => {
                console.error("Error deleting food:", error);
                alert("Failed to delete food. Please try again.");
            });
    }
};

  return (
    <div id="home">
      <Base>
        <div id="home-container">
          <div className="category">
            <h3>Recipe List</h3>
            {loading ? <Loading /> : (
              <div id="item-container">
                {foods.food && foods.food.length > 0 ? (
                  foods.food.map((d) => (
                    <div id="item-box" key={d._id}>
                      <div className="f-img">
                        <img
                          src={d.photo}
                          alt={d.foodName}
                          className={!d.status ? "blurred" : ""}
                        />
                        {!d.status && <p style={{ color: "red" }}>Out of stock</p>}
                      </div>
                      <div className="f_list_detail">
                        <h6>{d.foodName}</h6>
                        <div id="f-btn">
                          {d.status ? (
                            <MdOutlineFastfood
                              style={{ color: "green" }}
                              onClick={() => handleToggleStatus(d._id)}
                            />
                          ) : (
                            <MdOutlineNoFood
                              style={{ color: "red" }}
                              onClick={() => handleToggleStatus(d._id)}
                            />
                          )}
                          <i className='bx bx-edit-alt'
                            onClick={() => navigate(`/editFood/${d._id}/${token}`)}
                            style={{ color: "blue" }}
                          ></i>
                          <i
                            className="bx bx-trash"
                            style={{ color: "red" }}
                            onClick={() => handleRemove(d._id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recipes available.</p>
                )}
                <div id="item-box" onClick={() => navigate(`/${c_id}/addFood`)}>
                  <div className="f-img">
                    <img src={img} alt="add" />
                  </div>
                  <div id="f-detail" className="f_list_detail">
                    <h6>ADD RECIPE</h6>
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
