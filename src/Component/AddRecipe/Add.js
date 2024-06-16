import React from 'react'
import './Add.css';
import Base from '../../Base/Base';
import img from '../../Images/a.jpg'

export default function Add() {
  return (
    <div id='add'>
    <Base>
    <div id='add-container'>
    <h3>ADD RECIPES</h3>
    <div id='add-box-container'>
    <div id='add-box'>
    <div id='add-img'>
    <img src={img} alt=''/>
    </div>
    <div id='add-field'>
    <input type='text' placeholder='name'/>
    </div>
    <div id='add-field'>
    <select><option>Select Category</option>    <optgroup label='Category'><option>Milkshaks</option>
    <option>Sandwhitch</option></optgroup>
    

    </select>
    </div>
    <div id='add-btn'>
    <button>ADD</button>
    </div>
    </div>
    </div>
    </div>
    </Base>
    </div>
  )
}
