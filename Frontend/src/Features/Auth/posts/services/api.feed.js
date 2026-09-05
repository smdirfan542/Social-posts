import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export async function HandleFeedApi(req,res){
    const response  = await api.get('/posts/feed')
    return response;
}

export async function HandleFollowRequest(username){
    const response = await api.post(`/users/follow/${username}`)
    return response;
}




export async function CreatePost(imagefile,caption){
    const formdata =new FormData();

    formdata.append('postman-image',imagefile)
    formdata.append('caption',caption);

    const response = await api.post('/posts',formdata)

    return response.data;
}

export async function AcceptFollowRequests(postsusername){

    const response=await api.post(`/users/Accept/${postsusername}`);
    return response.data;
    
}

export async function RejectFollowRequest(postsusername){
    const response = await api.post(`/users/Reject/${postsusername}`)
    return response.data;
}

export async function Logoutcontroller(){
    const response = await api.post('/users/logout');
    return response.data;
}