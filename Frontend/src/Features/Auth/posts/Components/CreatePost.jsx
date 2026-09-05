import React, { useRef, useState } from 'react'
import './CreatePost.scss'
import { UseFeedHook } from '../feedhook/feed.hook';
import { useNavigate } from 'react-router';
const CreatePost = () => {

    const [caption,setCaption]=useState('');
    const postImageInputRef=useRef(null)
    const navigate = useNavigate();
    const {HandleCreatePost,HandleFeed}=UseFeedHook();

    async function handleSubmit(e){
        e.preventDefault();
        const file = postImageInputRef.current.files[0]
          await HandleCreatePost(file,caption)
          HandleFeed();
          navigate('/')
    }
    
  return (
    <div className='createpost-div flex flex-col w-full h-screen justify-center items-center gap-5 '>

        <h1 className='text-3xl select-none'>Create Post</h1>
        <form onSubmit={handleSubmit} className="maincreatepost flex flex-col justify-center gap-3 w-full items-center">

        <label className= 'imageupload bg-white text-black text-xl rounded-md font-bold' htmlFor="FileUpload">UploadImage</label>
        <input type="file" ref={postImageInputRef} name="FileUpload" id="FileUpload"  className=' hidden '/>
        <input type="text" onChange={(e)=>{setCaption(e.target.value)}} placeholder='Enter Caption' name="" id="" className='bg-white rounded-md text-black text-2xl ' />
        
        <input type="submit" className='bg-red-500 rounded-md text-xl cursor-pointer'value="CreatePost" />
        </form>


    </div>
  )
}

export default CreatePost