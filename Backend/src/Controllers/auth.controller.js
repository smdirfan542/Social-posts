const crypto = require('crypto')
const bcrypt = require('bcrypt')
const userModel = require('../Models/usermodel')
const jwt = require('jsonwebtoken')


async function registerController  (req,res){
    const {username , email, password,profile_pic,bio}= req.body;

    // const checkuser =  await userModel.findOne({email});

    // if(checkuser){
    //     return res.status(201).json({
    //         message:'user already registered or exists'
    //     })
    // }

    // const checkusername = await userModel.findOne({username});
    // if(checkusername){
    //     return res.status(200).json({
    //         message:'this username aready exists'
    //     })
    // }


    const checkUserExist = await userModel.findOne({ $or:
        [{email},{username}]
    })

    if(checkUserExist){
        return res.status(200).json({
            message:'This user already exists' + (checkUserExist.email == email ? "  email already exists":"  username already exists")
        })
    }


    
    const hash =await bcrypt.hash(password,10);
    const user = await userModel.create({username, email , password:hash , profile_pic, bio});
    const token = jwt.sign({
        id:user._id,
        
        email
    },process.env.JWT_SECRET_KEY)

    res.cookie('token',token);

    res.status(200).json({
        message:'successfully registered ',
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profile_pic
        },
        token
    })
}


async function loginController (req,res){
    const  {username,email,password}= req.body;

    const user = await userModel.findOne({
         $or: [ ...(username ? [{ username }] : []), ...(email ? [{ email }] : []) ]
    }).select('password')
    
    if(!user){return res.status(200).json({message:'Please do register first'
    })}

    const userotherdetails=await userModel.findById(user.id)
    
    const checkPsd =await bcrypt.compare(password,user.password);
    if(!checkPsd){
        return res.status(401).json({message:'Invalid Credentials'});
    }
    const token = jwt.sign({
        id:user._id,
        username:userotherdetails.username,
        email:userotherdetails.email
    },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
    res.cookie('token',token);
    res.status(200).json({
        message:'successfully logged in',
        userotherdetails
    })
}

async function logoutController(req,res){
    res.clearCookie('token')

    res.status(200).json({
        message:'Logged out successfully',

    })
}

async function deleteController (req,res){
    const users = await userModel.deleteMany();
    res.status(200).json({
        message:'deleted successfully'
    })
}
async function tokenController (req,res){
    const token = req.cookies.token;
    const decodetoken = jwt.verify(token , process.env.JWT_SECRET_KEY)
    if(!decodetoken){ return res.status(200).json({message:'token failed or expired do login'})}
    const user = await userModel.findById(decodetoken.id) ;
    
    res.status(200).json({
        message:'successfully fetched the accoutnt with cookie',
        
        username:user.username,
        useremail:user.email,
        bio:user.bio,
        profile_pic:user.profile_pic
    })
    
}
module.exports={
    registerController,loginController,deleteController,tokenController,logoutController
}
