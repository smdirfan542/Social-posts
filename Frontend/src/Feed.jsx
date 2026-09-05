import React, { useEffect } from 'react'
import Post from './Features/Auth/posts/Components/Post'
import { UseFeedHook } from './Features/Auth/posts/feedhook/feed.hook'
import {useNavigate} from 'react-router-dom'
import Navbar from './Features/Auth/posts/Components/Navbar'
const Feed = () => {

    const {HandleFeed,loading,feed}=UseFeedHook();
    const navigate=useNavigate();
    useEffect(()=>{
        HandleFeed();
    },[])
    if(loading || !feed)    {
       
            return <main>
            <h1>Loading the feed...</h1>
            {/* <button className='bg-red-500 text-black text-2xl rounded-md' onClick={()=>{navigate('/login')}}>Login</button> */}
        </main>

       
    }
  

  return (
      <div className='feed p-3 min-w-screen min-h-screen flex justify-center flex-wrap '>
       <div className="allposts w-[560px]  min-h-screen flex flex-col items-center gap-2 bg-blue-950 rounded-md">
        <Navbar/>
        {
            feed.map((post)=>{
              return <Post key={post._id} isFollow={post.isFollowing} isBeingFollowed={post.isBeingFollowed} isSameUser={post.isSameUser} FollowStatus={post.isStatus} username={post.user.username} isliked={post.isliked} profileimg={post.user.profile_pic} caption={post.caption} imageurl={post.ImageUrl} />
           
            })
        }
        
        </div>
    </div>
  )
}

export default Feed