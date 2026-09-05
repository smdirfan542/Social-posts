import { useContext, useEffect } from "react";
import { FeedContext } from "../feed.context";
import { CreatePost, HandleFeedApi, Logoutcontroller } from "../services/api.feed";
import { HandleFollowRequest } from "../services/api.feed";
import { AcceptFollowRequests } from "../services/api.feed";
import { RejectFollowRequest } from "../services/api.feed";

export function UseFeedHook(){
    const context = useContext(FeedContext);

    const {loading,setLoading,feed,setFeed,post,setPost}=context;
    

    const HandleFeed = async()=>{
        setLoading(true);
        const response =await HandleFeedApi();
    
       
        setFeed(response.data.posts)
        setLoading(false)
    }

    const FollowRequest = async(username)=>{
        setLoading(true)
        const response = await HandleFollowRequest(username);
        
        setLoading(false)
    }

    const HandleCreatePost= async(imagefile,caption)=>{

        setLoading(true)
        const response = await CreatePost(imagefile,caption);
        setFeed([response.posts,...feed])
        setLoading(false)

    }

    const HandleFollowAcceptRequest=async(postsusername)=>{
        setLoading(true)
        const response = await AcceptFollowRequests(postsusername);
        HandleFeed();
        setLoading(false)

    }
    
    const HandleRejectFollowRequest= async(postsusername)=>{
        setLoading(true)
        const response = await RejectFollowRequest(postsusername);
        setLoading(false)
    }

    const HandleLogout = async()=>{
        setLoading(true)
        const response = await Logoutcontroller();
        setLoading(false)
    }
    
    return {HandleFeed,loading,feed,post,FollowRequest,HandleCreatePost,HandleFollowAcceptRequest,HandleRejectFollowRequest,HandleLogout}
}