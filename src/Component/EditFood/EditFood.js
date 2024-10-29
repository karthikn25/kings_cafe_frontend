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
import { foodUpdate, fetchFoodDetails } from '../../Redux/actions/foodAction';
import { useParams } from 'react-router-dom';

export default function EditFood() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { f_id } = useParams(); // Assuming f_id is actually the id of the food item
  const [credential, setCredential] = useState({
    foodName: "",
    price: "",
    photo: "",
    details: ""
  });

  // Fetch food details when the component mounts
 

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

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("foodName", credential.foodName);
    data.append("price", credential.price);
    data.append("details", credential.details);
    if (credential.photo) {
      data.append("photo", credential.photo);
    }
    
    setLoading(true);
    await dispatch(foodUpdate(data, f_id));
    setLoading(false);
  };

  return (
    <div id="add">
      <Base>
        <div id="add-container">
          <h3>EDIT RECIPES</h3>
          <div id="add-box-container">
            <div id="add-box">
              <div id="add-img">
                <img src={img} alt="" />
                <input type="file" onChange={handleChange} name="photo" />
              </div>
              <div id="add-field">
                <input
                  type="text"
                  placeholder="name"
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
                <button onClick={handleCreate} disabled={loading}>
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
