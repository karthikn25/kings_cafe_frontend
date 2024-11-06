// import React, { useState } from 'react'
// import Base from '../../Base/Base'
// import img from "../../Images/a.jpg";
// import { useDispatch } from 'react-redux';
// import { foodUpdate } from '../../Redux/actions/foodAction';
// import { useParams } from 'react-router-dom';


// export default function EditFood() {

//   const [loading,setLoading]=useState(false);
//   const dispatch = useDispatch();
//   const [credential,setCredential]=useState({
//     foodName:"",
//     price:"",
//     photo:"",
//     details:""
//   })
//   const f_id = useParams();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       setCredential({
//         ...credential,
//         photo: files[0],
//       });
//     } else {
//       setCredential({
//         ...credential,
//         [name]: value,
//       });
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("foodName", credential.foodName);
//     data.append("price", credential.price);
//     data.append("details", credential.details);
//     if (credential.photo) {
//       data.append("photo", credential.photo);
//    }
//     dispatch(foodUpdate(data,f_id)).then(()=>{
      
//     })
   
//   };
  

//   return (
//     <div id="add">
//     <Base>
//       <div id="add-container">
//         <h3>EDIT RECIPES</h3>
//         <div id="add-box-container">
//           <div id="add-box">
//             <div id="add-img">
//               <img src={img} alt="" />
//               <input type="file" onChange={"handleChange"} name="photo" />
//             </div>
//             <div id="add-field">
//               <input
//                 type="text"
//                 placeholder="name"
//                 name="foodName"
//                 onChange={"handleChange"}
//                 value={"foodDetails.foodName"}
//               />
//             </div>
//             <div id="add-field">
//               <input
//                 type="number"
//                 placeholder="Price"
//                 name="price"
//                 onChange={"handleChange"}
//                 value={"foodDetails.price"}
//               />
//             </div>
//             <div id="add-field">
//               <textarea
//                 type="text"
//                 placeholder="Details of Recipe"
//                 name="details"
//                 onChange={"handleChange"}
//                 value={"foodDetails.details"}
//               />
//             </div>
//             <div id="add-btn">
//               <button onClick={"handleCreate"}>UPDATE</button>
//             </div>
//             {/*
//                 {error ? (
//                     <div id="error">{error}</div>
//                   ) : (
//                     <div id="success">{success}</div>
//                   )}*/
//             }
           
//           </div>
//         </div>
//       </div>
//     </Base>
//   </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import Base from '../../Base/Base';
import img from "../../Images/a.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { foodUpdate, getSingleFood  } from '../../Redux/actions/foodAction';
import { useParams } from 'react-router-dom';

export default function EditFood() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { f_id } = useParams(); // Assuming f_id is the id of the food item

  const foodDetails = useSelector((state) => state.foodDetails); // Make sure to have this in your Redux state
  const [credential, setCredential] = useState({
    foodName: "",
    price: "",
    photo: "",
    details: ""
  });

  // Fetch food details when the component mounts
  useEffect(() => {
    if (f_id) {
      dispatch(getSingleFood(f_id));
    }
  }, [dispatch, f_id]);

  // Update the form state when foodDetails is available
  useEffect(() => {
    if (foodDetails) {
      setCredential({
        foodName: foodDetails.foodName || "",
        price: foodDetails.price || "",
        details: foodDetails.details || "",
        photo: ""
      });
    }
  }, [foodDetails]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setCredential({
        ...credential,
        photo: files[0],
      });
    } else {
      setCredential({
        ...credential,
        [name]: value,
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
      await dispatch(foodUpdate(data, f_id));
      setLoading(false);
    } catch (error) {
      console.error("Error updating food:", error);
      setLoading(false);
      // Optionally, set an error state to show the user an error message
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
                <input type="file" onChange={handleChange} name="photo" />
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
