import React from 'react'
import './Forget.css'

export default function Forget() {
  return (
    <div id='forget'>
    <div className="row" id='forget-form-row'>
    <h3>MENU CHANGES</h3>
    <div id='forget-form'>
    <form>
    <div className="form-floating mb-1" id="forget-field">
    <input
      type="email"
      className="form-control"
      id="floatingInput"
      placeholder="johndoe@gmail.com"
    />
    <label for="floatingInput">Email</label>
  </div>
    </form>
    <div id='forget-btn'>
    <button>UPDATE</button>
    </div>
    </div>
    </div>
    
    </div>
  )
}
