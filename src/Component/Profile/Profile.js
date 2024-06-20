import React, { useState } from "react";
import "./Profile.css";
import Base from "../../Base/Base";
import img from "../../Images/PROFILE.jpg";
import { URL } from "../../Server";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData,setUserData]=useState(
    {
      name:"",
      avatar:null
    }
  )
  const[error,setError]=useState();
  const[success,setSuccess]=useState();

  const id = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const { name,value,files }= e.target;
    if(name === 'avatar'){
      setUserData(
        {...userData,
          avatar:files[0],
        }
      );
    }
    else{
      setUserData({
        ...userData,
        [name]:value,
      });
    }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    
     
      const data = new FormData()
      data.append("name",userData.name)
      if(userData.avatar){
        data.append("avatar",userData.avatar)
      }

      const res = await fetch(`${URL}/user/edit/${id}`,{
        method:"PUT",
        body:data,
       
      }) 
      const data1 = await res.json();
      console.log(data1);
      if(!data1.user){
        setError(data1.message)
        setSuccess("")
      }
      else{
        setError("")
        setSuccess(data1.message)
        setTimeout(()=>{
          navigate(`/home/${token}`)
        })
      }

   
  }
  return (
    <div id="profile">
      <Base>
        <div id="profile-box-container">
          <div id="profile-box">
            <div id="profile-img">
              <img src={img} alt="profile" />
              <input type="file"  onChange={handleChange} name="avatar"/>
            </div>
            <div id="profile-field">
              <input type="text" placeholder="name" value={userData.name} onChange={handleChange} name="name"/>
            </div>
            <div id="profile-btn">
              <button onClick={handleUpdate}>UPDATE</button>
            </div>
            {
              error ? <div id="error">{error}</div>:<div id="success">{success}</div>
            }
          </div>
        </div>
      </Base>
    </div>
  );
}
