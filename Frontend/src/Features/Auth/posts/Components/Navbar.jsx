import React from 'react'
import './navbar.scss'
import { useNavigate } from 'react-router'
import { UseFeedHook } from '../feedhook/feed.hook'

const Navbar = () => {


  const {HandleLogout}=UseFeedHook();

    const navigate=useNavigate();

    function handleCreatePost(){
        navigate('/CreatePost')
    }

    async function handleLogOut(){
      await HandleLogout();
      navigate('/login')
    }
    
  return (
    <div className='nav bg-blue-900 rounded-md flex justify-between w-full text-black'>
        <h1 className='n1 bg-emerald-900 font-semibold font-mono italic  rounded-md text-white text-2xl '>InstaGram</h1>
        <div>
        <button onClick={()=>{handleCreatePost()}} className='n2 bg-red-500 rounded-md text-white text-2xl cursor-pointer' >CreatePost</button>
        <button onClick={()=>{handleLogOut()}} className='n2 bg-emerald-400  rounded-md text-black font-bold text-2xl cursor-pointer' >LogOut</button>
        </div>
    </div>
  )
}

export default Navbar