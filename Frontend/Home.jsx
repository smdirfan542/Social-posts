
import React from 'react'
import { Link } from 'react-router'
const Home = () => {
  return (
    <div>

        <h1>Welcome to the home page...</h1>
    <div className='flex flex-col gap-2'>
        <button className='p-2 bg-red-500 w-30 rounded-md '>
          <Link to='/login'>Login</Link>
        </button>
        <button className='p-2 bg-red-500 w-30 rounded-md '>
          <Link to='/register'>Register</Link>
        </button>

    </div>
        
    </div>
  )
}

export default Home