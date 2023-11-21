import React, { useState } from 'react'
import './Login.css'

import username_icon from '../imgs/user.png'
import password_icon from '../imgs/password.png'
import logo_icon from '../imgs/logo_gl.png'

const Login = () => {

  const [action, setAction] = useState("Logn");



  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='header'>
            <div className="logo">
                <img src={logo_icon} alt="" className="logo" />
            </div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={username_icon} alt=""/>
                <input type="text" placeholder='Username' />
            </div>
            <div className="input">
                <img src={password_icon} alt=""/>
                <input type="password" placeholder='Password'/>
            </div>
        </div>
        <div className="submit-container">
            <div className={action==="Login" ? "submit_gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}

export default Login