const userModel = require('../Models/usermodel')
const postModel = require("../Models/postSchema");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require('../Models/Likemodel')
const followModel=require('../Models/FollowModel')

const jwt = require("jsonwebtoken");



const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createpostController(req, res) {
  
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "postman-image",
    folder: "insta-clone-posts",
  }); 
  const post = await postModel.create({
    caption: req.body.caption,
    ImageUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "post uploaded successfully",
    post,
  });
}

async function getUserPostController(req, res) {
  const userposts = await postModel.find({
    user: req.user.id,
  });
  res.status(201).json({
    message: "successfully fetched",
    userposts,
  });
}

async function postDetailsController(req,res){
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if(!post){
        return res.status(404).json({
            message:"post not found."
        })
    }

    const IsValidUser = post.user.toString() === userId;
    if(!IsValidUser){
        return res.status(403).json({
            message:'Forbidden Content.',
            
        })
    }

    return res.status(201).json({
        message:'Post Fetchend Successfully.',
        post
    })
    
}




async function deletePostsController(req, res) {
  const users = await postModel.deleteMany();
  res.status(201).json({
    message: "All posts deleted successfully",
  });
}



async function likePostController(req,res){
   
  
 console.log('like controller')
  const userId=req.user.id;
  const userdetails = await userModel.findById(userId);
  // console.log(userdetails)
  const usernameId=req.user.id;
  const postId = req.params.postId;
  
  const post_details=await postModel.findById(postId)
  if(!post_details){
    return res.status(404).json({
      message:'This post not found'
    })
  }
  // console.log('first check')
  // console.log(usernameId+ " " +post_details.user)
  const Mypost = usernameId.toString() === post_details.user.toString()

  if(Mypost){
    return res.status(401).json({
      message:'You cannot like your own post',
      post_details
    })
  }
  // console.log('second check')

  
  const alreadyLiked=await likeModel.findOne({post:postId});
  if(alreadyLiked){
    return res.status(201).json({
      message:'you already liked this post'
    })
  }
  
  
  const like = await likeModel.create({
    post:postId,
    user:userdetails.username
  })

  
  res.status(200).json({
    message:'successfully liked',
    
    like

  })
  
}


async function unlikePostController(req,res){
  const userId = req.user.id;
  const username = req.user.username;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    post:postId
  },{user:username})

  if(!isLiked){
    return res.status(401).json({
      message:'You have not liked this post',
    })
  }

  const Unlikepost = await likeModel.findOneAndDelete({
    post:postId
  })

  res.status(201).json({
    message:'unliked successfully',
    Unlikepost
  })

  
  
}

async function getFeedController(req,res){
  const userid=req.user.id;
  const username = req.user.username;

  const posts =await Promise.all( (await postModel.find().sort({_id:-1}).populate('user').lean()).map(async (post)=>{
    const isliked = await likeModel.findOne({
      post:post._id,
      user:username
    })
    post.isliked=Boolean(isliked)

    
   
    const following = await followModel.findOne({
      follower:username
      ,following:post.user.username
    })
  
    if(Boolean(following)){
    post.isFollowing = (post.user.username!=following.follower)?(Boolean(following)):false;
    
      post.isStatus = (post.user.username!=following.follower)?(following.status):'You cannot follow yourself'
      post.isSameUser=post.user.username===following.follower
    }else{
      post.isFollowing=Boolean(following);
      post.isStatus='pending'
        if(post.user.username==username){
          post.isSameUser=true;
        }else{
          post.isSameUser=false
        }
    }

    // from posts perspective

    const postuserfollowing = await followModel.findOne({
      follower:post.user.username,
      following:username
    })

    if(postuserfollowing){
      post.isBeingFollowed=true;
    }else{
      post.isBeingFollowed=false;
    }


    //updation after accepting the request 
    const checkacceptrequest = await followModel.findOne({
      follower:post.user.username,
      following:username
    })

    
    
    if(checkacceptrequest){
      if(checkacceptrequest.status=='accepted'){
        post.isStatus='accepted'
      }else{
        if(checkacceptrequest.status=='rejected'){
        post.isStatus='rejected'
      }}
    }else{
        post.isStatus='pending'
      }

    
    return post
  }))
  
  
  res.status(200).json({
    message:'posts fetched successfully',
    posts
  })
}





module.exports = { createpostController, deletePostsController ,getUserPostController,postDetailsController,likePostController,unlikePostController , getFeedController};
