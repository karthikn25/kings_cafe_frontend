import React, { useEffect, useState } from "react";
import "./AddCategory.css";
import Base from "../../Base/Base";
import img from "../../Images/a.jpg";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";
import { useDispatch, useSelector } from "react-redux";
import { categoryPost } from "../../Redux/actions/categoryAction";

export default function AddCategory() {

  const [credential,setCredential]=useState({
    name:"",
    picture:null
  })
  
  const navigate = useNavigate();

  const dispatch= useDispatch();

  const {categoryInfo,error}=useSelector((state)=>state.category);
  const [loading,setLoading]=useState(false);

  const [success, setSuccess] = useState();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setCredential({
        ...credential,
        picture: files[0],
      });
    } else {
      setCredential({
        ...credential,
        [name]: value,
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", credential.name);
    if (credential.picture) {
        data.append("picture", credential.picture);
    }

    if (loading) return;
    setLoading(true);

    try {
        const response = await dispatch(categoryPost(data));
        // Ensure that the response is being handled correctly
        if (response.error) {
            throw new Error(response.error);
        }
       
    } catch (err) {
        console.error("Error adding category:", err);
        setSuccess(""); // Clear success message on error
    } finally {
        setLoading(false);
        setSuccess("Category added successfully!");
        setTimeout(() => {
            navigate(`/home/${token}`);
        }, 1000);
    }
};


  return (
    <div id="add">
      <Base>
        <div id="add-container">
          <h3>ADD Category</h3>
          <div id="add-box-container">
            <div id="add-box">
              <div id="add-img">
                <img src={img} alt="img" />
                <input type="file" onChange={handleChange} name="picture" />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={handleChange}
                  value={credential.name}
                />
              </div>

              <div id="add-btn">
                <button onClick={handleAddCategory}>ADD</button>
              </div>
              {error ? (
                <div id="error">{error}</div>
              ) : (
                <div id="success">{success}</div>
              )}
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
