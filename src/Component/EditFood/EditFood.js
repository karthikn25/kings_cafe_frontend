import React, { useState, useEffect } from 'react';
import Base from '../../Base/Base';
import img from "../../Images/a.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { foodUpdate, getSingleFood } from '../../Redux/actions/foodAction';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditFood() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { f_id } = useParams(); // Assuming f_id is the id of the food item

  const { singleFood, error } = useSelector((state) => state.food);

  const [credential, setCredential] = useState({
    foodName: "",
    price: "",
    photo: "",
    details: ""
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch food details when the component mounts
  useEffect(() => {
    if (f_id) {
      dispatch(getSingleFood(f_id)); // Fetch the food details for editing
    }
  }, [dispatch, f_id]);

  // Update the form state when foodDetails is available
  useEffect(() => {
    if (singleFood) {
      setCredential({
        foodName: singleFood.foodName || "",
        price: singleFood.price || "",
        details: singleFood.details || "",
        photo: ""
      });
    }
  }, [singleFood]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setCredential({
        ...credential,
        photo: files[0], // Handle photo input separately
      });
    } else {
      setCredential({
        ...credential,
        [name]: value, // Update the corresponding field
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("foodName", credential.foodName);
    data.append("price", credential.price);
    data.append("details", credential.details);
    if (credential.photo) {
      data.append("photo", credential.photo);
    }

    setLoading(true);

    try {
      await dispatch(foodUpdate(data, f_id)); // Dispatch action to update food item
      setLoading(false);
      setTimeout(()=>{
        navigate(`/home/${token}`)
      })
    } catch (error) {
      console.error("Error updating food:", error);
      setLoading(false);
    }
  };

  return (
    <div id="add">
      <Base>
        <div id="add-container">
          <h3>EDIT RECIPES</h3>
          <div id="add-box-container">
            <div id="add-box">
              <div id="add-img">
                <img src={img} alt="Food" />
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange} // Correct onChange handler
                />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="Name"
                  name="foodName"
                  onChange={handleChange}
                  value={credential.foodName}
                />
              </div>
              <div id="add-field">
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                  value={credential.price}
                />
              </div>
              <div id="add-field">
                <textarea
                  placeholder="Details of Recipe"
                  name="details"
                  onChange={handleChange}
                  value={credential.details}
                />
              </div>
              <div id="add-btn">
                <button onClick={handleUpdate} disabled={loading}>
                  {loading ? 'Updating...' : 'UPDATE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
