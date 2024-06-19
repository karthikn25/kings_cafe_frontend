import React from 'react';
import './Profile.css';
import Base from '../../Base/Base';
import img from '../../Images/PROFILE.jpg'

export default function Profile() {
  return (
    <div id='profile'>
    <Base>
   <div id='profile-box-container'>
   <div id='profile-box'>
   <div id='profile-img'>
    <img src={img} alt='profile'/>
    <input type='file'/>
    </div>
    <div id='profile-field'>
    <input type='text' placeholder='name'/>
    </div>
   <div id='profile-btn'>
    <button>UPDATE</button>
    </div>
   </div>
   </div>
    </Base>
   </div>
  )
}
