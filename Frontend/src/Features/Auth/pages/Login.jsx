import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';


const Login = () => {

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const {HandleLogin,loading}=useAuth();

    const navigate = useNavigate();
    
    if(loading){
        return (
            <h1>Loading....</h1>
        )
    }
    
    async function handleFormSubmit(e){
        e.preventDefault();
        HandleLogin(username,password).then(res=>{
            console.log(res)
            navigate("/")

        })
    }
  return (
    <main>
        <div className="container">
            <h1>Login Form</h1>
            <form onSubmit={handleFormSubmit}>
                <input onInput={(e)=>{setUsername(e.target.value)}}  type="text" name="" placeholder='Username' id="" />
                <input onInput={(e)=>{setPassword(e.target.value)}} type="text" name="" placeholder='Password' id="" />
                <input type="submit" id="btn" value="Login" />

            </form>
            <p>
                Haven't registered yet ? please do <Link to="/register" className='underline'>Register</Link>
            </p>
        </div>
    </main>
  )
}

export default Login