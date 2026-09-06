import axios from 'axios'

const api = axios.create({
    baseURL:'https://social-posts-ltay.onrender.com/auth',
    withCredentials:true
})

export async function Login(username,password){
    try{

        const response = await api.post('/login',{
            username,password
        })

        return response.data
        
    }catch(err){
        throw err
    }
}

export async function Register(username,email,password){

    try{
        const response = await api.post('/register',{
            username,
            email,
            password
        })

        return response.data
    }catch(err){
        throw err;
    }
}

export async function getMe(){
    try{
        const response = await api.post('/gettoken');
        return response.data;
    }catch(err){
        throw err;
    }
}
