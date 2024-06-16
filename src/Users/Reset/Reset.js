import React, { useState } from 'react'
import './Reset.css'

export default function Reset() {
  const [show,setShow]=useState();

  const toggle = ()=>setShow(!show);

  return (
    <div id='reset'>
    <div className='row'>
    <div className='col' id='reset-msg'>
    <h3>CHANGE YOUR</h3>
    <h6>DELICIOUS FOOD</h6>
    </div>
    </div>
    <div className='row'>
    <div className='col' id='reset-form'>
    <div id='reset-form-field'>
    <div className="form-floating" id="reset-field">
              <input
                type={!show ? "password" : "text"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="reset-show">
              <input type="checkbox" onClick={toggle}/> Show
            </div>
            <div className="form-floating" id="reset-field">
            <input
              type= "password"
              className="form-control"
              id="floatingPassword"
              placeholder="Confirm Password"
            />
            <label for="floatingPassword">Password</label>
          </div> 
         
    </div>
    
    </div>
    <div id='reset-btn'>
    <button>CHANGE</button>
    </div>
    </div>
    </div>
  )
}
