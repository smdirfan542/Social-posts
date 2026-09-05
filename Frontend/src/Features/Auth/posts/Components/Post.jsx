import React, { useEffect, useState } from "react";
import { RiHeartLine, RiMessage2Line, RiShareLine } from "react-icons/ri";
import { UseFeedHook } from "../feedhook/feed.hook";
import './post.scss'
const Post = ({
  username,
  profileimg,
  caption,
  imageurl,
  isliked,
  isFollow,
  FollowStatus,
  isSameUser,
  isBeingFollowed,
}) => {

    const {FollowRequest,HandleFeed,HandleFollowAcceptRequest,HandleRejectFollowRequest}=UseFeedHook();
    
   

    // console.log(FollowStatus+" "+isFollow+" "+isBeingFollowed)
  
  async function HandleFollowButton(e) {
    
    let ButtonTargetValue = `${isSameUser  ? "me" : isFollow ? (FollowStatus === "pending" ? "sent-request" : FollowStatus) : "Follow"} `;
   await FollowRequest(username)
   await HandleFeed()
    // console.log(username)
    
     console.log("dummy : "+ButtonTargetValue)
  }

  async function HandleAcceptFlwBtn(){

      await HandleFollowAcceptRequest(username);

      await HandleFeed();
      console.log("AcceptBtn: "+FollowStatus)
  }
  async function HandleRejectFlwBtn(){
    await HandleRejectFollowRequest(username);
    await HandleFeed();
    console.log("RejectBtn: "+FollowStatus)
  }
  
  return (
    <div className="posts mt-2 border bg-black w-[480px] h-[560px] rounded-md flex flex-col justify-evenly gap-3 items-center">
      <div className="user  flex items-center  w-100  justify-start gap-3 overflow-hidden " >
        <div className="imgwrapper border rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <img
            className="w-11 cover bg-center object-cover h-[100%]  rounded-[50%]  m-3  "
            src={profileimg}
            alt=""
          />
        </div>
        <p className="text-3xl  ">{username}</p>
    
        
        { (isBeingFollowed)?( (FollowStatus=='pending')?<div> <button onClick={HandleAcceptFlwBtn} className="acceptflwbtn text-xl bg-emerald-400 text-black rounded-md font-bold " > Accept </button> <button onClick={HandleRejectFlwBtn} className="rejectflwbtn text-xl bg-red-500 rounded-md font-semibold  " >Reject</button></div>:((FollowStatus=='accepted')?"following":"notfollowing")):  <button
          onClick={(e)=>{HandleFollowButton(e)}}
          className="flw-btn bg-blue-900 cursor-pointer text-xl relative "
        >
          {isSameUser
            ?<p className="absolute top-0 left-0 w-15 bg-black select-none"> "(Me)"</p>
            : isFollow
              ? FollowStatus == "pending"
                ? "sent request"
                : "Following"
              : "Follow"}
        </button>}
      

      </div>
      <img
        className="post-img border p-2 rounded-md w-105 h-60 overflow-hidden"
        src={imageurl}
        alt=""
      />
      <div className="interactions  flex w-full gap-2">
        {isliked ? (
          <RiHeartLine size={33} className="text-red-500" />
        ) : (
          <RiHeartLine size={33} />
        )}
        <RiShareLine size={33} />
        <RiMessage2Line size={33} />
      </div>
      <div className="bottom">
        <p className="caption">{caption}</p>
      </div>
    </div>
  );
};

export default Post;
