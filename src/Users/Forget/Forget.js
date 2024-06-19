import React, { useState } from 'react'
import './Forget.css'
import { URL } from '../../Server';

export default function Forget() {
  const [email,setEmail]=useState();

  const [error,setError]=useState();
  const [success,setSuccess]=useState();

  const handleForget = async(e)=>{
    e.preventDefault();

    const res = await fetch(`${URL}/user/forget-password`,{
      method:"POST",
      body:JSON.stringify({email}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(!data.link){
      setError("Error occured in Email Send")
      setSuccess("")
    }else{
      setSuccess("Mail send Successfully")
      setError('')
    }
  }
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
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />
    <label for="floatingInput">Email</label>
  </div>
    </form>
    <div id='forget-btn'>
    <button onClick={handleForget}>UPDATE</button>
    </div>
    {
      error ? <div id='error'>{error}</div> : <div id='success'>{success}</div>
    }
    </div>
    </div>
    
    </div>
  )
}
