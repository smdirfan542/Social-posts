import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import {useAuth} from '../hooks/useAuth'
const Register = () => {

const [username , setUsername]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const {HandleRegister}=useAuth()

const navigate =useNavigate();
    
async function handleFormSubmit(e){
    e.preventDefault();

    await HandleRegister(username,email,password);
    navigate('/login')
    
}
    
  return (
     <main>
        <div className="container">
            <h1>Registration Form</h1>
            <form onSubmit={handleFormSubmit} >
                <input onChange={(e)=>{setUsername(e.target.value)}}  type="text" name="" placeholder='Username' id="" />
                <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="" placeholder='email' id="" />
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="" placeholder='Password' id="" />
                <input type="submit" id="btn" value="Login" />

            </form>
            <p>Already have an account? Do <Link to="/login" className='underline'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register