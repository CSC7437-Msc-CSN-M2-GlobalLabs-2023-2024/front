import React, { useRef, useState } from 'react'

import username_icon from '../imgs/user.png'
import password_icon from '../imgs/password.png'
import logo_icon from '../imgs/logo_gl.png'
import background from '../imgs/background.jpg'
import { useNavigate } from 'react-router-dom'

const Login = () => {


  const email = useRef("");
  const pass = useRef("");

  const navigate = useNavigate();

  const [resultMess, setResultMess] = useState("");

  async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return hash;
  }

  const handleSubmit = () => {

    fetch('http://localhost:8080/api/staff/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.current.value.trim(),
            passwordHash: digestMessage(pass.current.value.trim())
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Staff members:', data);
        navigate("/main");

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setResultMess("Incorrect credentials!");
    });

  }



  return (
    <div style={{"background-size": "cover", "background-image": `url(${background})`}} className='w-full h-screen flex flex-col justify-center items-center '>
        <div className='header'>
            <div className="logo">
                <img src={logo_icon} alt="" className="logo" />
            </div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={username_icon} alt=""/>
                <input ref={email} type="text" placeholder='Email' />
            </div>
            <div className="input">
                <img src={password_icon} alt=""/>
                <input ref={pass} type="password" placeholder='Password'/>
            </div>
        </div>
        <div className="submit-container">
            <div className={"submit"} onClick={()=>{handleSubmit()}}>Login</div>
        </div>
        <div className={resultMess === "" ? "hidden" : "flex justify-center items-center text-2xl m-2 text-red-600 font-bold"}>
            <p>{resultMess}</p>
        </div>
    </div>
  )
}

export default Login