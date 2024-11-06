import React, { useState, useEffect } from 'react';
import Base from '../../Base/Base';
import img from "../../Images/a.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { categoryEdit } from '../../Redux/actions/categoryAction';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCategory() {
  const [credential, setCredential] = useState({
    name: "",
    picture: null
  });

  const {c_id} = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { categoryInfo, error } = useSelector((state) => state.category);

  // Populate the form with existing category information on mount
  useEffect(() => {
    if (categoryInfo) {
      setCredential({
        name: categoryInfo.name,
        picture: null // You may not want to set this if there's an existing picture
      });
    }
  }, [categoryInfo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setCredential(prev => ({
        ...prev,
        picture: files[0],
      }));
    } else {
      setCredential(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", credential.name);
    if (credential.picture) {
      data.append("picture", credential.picture);
    }

    if (loading) return;
    setLoading(true);

    try {
      const response = await dispatch(categoryEdit(data,c_id));
      if (response.error) {
        throw new Error(response.error);
      }
      setSuccess("Category updated successfully!");
      setTimeout(() => {
        navigate(`/home/${token}`);
      }, 1000);
    } catch (err) {
      console.error("Error updating category:", err);
      setSuccess(""); // Clear success message on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="add">
      <Base>
        <div id="add-container">
          <h3>EDIT CATEGORY</h3>
          <div id="add-box-container">
            <div id="add-box">
              <div id="add-img">
                <img src={img} alt="img" />
                <input 
                  type="file" 
                  onChange={handleChange} 
                  name="picture" 
                />
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
                <button onClick={handleEditCategory} disabled={loading}>
                  {loading ? 'Updating...' : 'UPDATE'}
                </button>
              </div>
              {error && <div id="error">{error}</div>}
              {success && <div id="success">{success}</div>}
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
