import React, { useEffect, useState } from 'react';
import './SearchFood.css';
import { useNavigate, useParams } from 'react-router-dom';
import Base from '../../Base/Base';
import { MdOutlineFastfood, MdOutlineNoFood } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, searchFood, toggleFoodStatus } from '../../Redux/actions/foodAction';
import Loading from '../../Base/Loader/Loading';

export default function SearchFood() {
  const { keyword } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for foods and error
  const { foods, error } = useSelector((state) => state.food);

  // Ensure foods.food is always an array, fallback to empty array
  const safeFoods = Array.isArray(foods?.food) ? foods.food : []; // Safeguard for food array

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
    // Only fetch food data if there's a keyword change
    if (keyword) {
      handleFetchFood();
    }
  }, [dispatch, keyword, token, navigate]);

  // Fetch food data when the keyword changes
  const handleFetchFood = async () => {
    setLoading(true);
    try {
      dispatch(searchFood(keyword)); // Dispatch the action to search food based on keyword
    } catch (err) {
      console.log('Error fetching food:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle food status (in stock / out of stock)
  const handleToggleStatus = (foodId) => {
    dispatch(toggleFoodStatus(foodId))
      .then(() => {
        dispatch(searchFood(keyword));  // Re-fetch food list after toggle
      })
      .catch((error) => console.error('Error toggling food status:', error));
  };

  // Remove food from the list
  const handleRemove = async (foodId) => {
    if (window.confirm("Are you sure you want to remove this food?")) {
      dispatch(deleteFood(foodId))
          .then(() => {
              // Refresh the food list after deletion
              dispatch(searchFood(keyword));
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
                        <i class='bx bx-edit-alt'
                        onClick={()=>navigate(`/editFood/${d._id}/${token}`)}
                        style={{ color: "blue" }}

                        ></i>
                        <i
                          className="bx bx-trash"
                          style={{ color: "red" }}
                          onClick={() => handleRemove(d._id)} // Updated to use the new handleRemove function
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recipes available.</p>
              )}
         
            </div>
          )}
        </div>
      </div>
    </Base>
  </div>
  );
}
