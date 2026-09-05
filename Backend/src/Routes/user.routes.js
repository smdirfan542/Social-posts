const express = require('express')
const userController=require('../Controllers/user.controller')
const IdentifyUser=require('../Middleware/auth.middleware')
const jwt = require('jsonwebtoken')
const userRouter = express.Router();

userRouter.post("/follow/:username",IdentifyUser,userController.userFollowController)
userRouter.get('/getuser',async (req,res)=>{
    const token = req.cookies.token;
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    res.status(201).json({
        message:'success',
       username: decoded.username
    })
}
    )

userRouter.post('/unfollow/:username',IdentifyUser,userController.userUnfollowController);
userRouter.get('/followerlist',IdentifyUser,userController.getFollowRequests)
userRouter.post('/Accept/:followername',IdentifyUser,userController.AcceptFollowRequests)
userRouter.post('/Reject/:followerusername',IdentifyUser,userController.RejectFollowRequest)
module.exports= userRouter;
