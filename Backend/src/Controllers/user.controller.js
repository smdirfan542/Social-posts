const followModel=require('../Models/FollowModel')
const userModel=require('../Models/usermodel')


async function userFollowController(req,res){
    const followerusername=req.user.username; // from auth.middlwware decoded ;
    const followeeusername = req.params.username; // from params 

    if(followerusername === followeeusername){
        return res.status(401).json({
            message:'you cannot follow yourself'
        })
    }

    const isUserExists = await userModel.findOne({
        username:followeeusername
    })
    if(!isUserExists){
        return res.status(404).json({
            message:'User you are trying to follow doesnot exists'
        })
    }
    
    

    const isAlreadyFollowing= await followModel.findOne({
        follower:followerusername,
        following:followeeusername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You are already following ${followeeusername}`,
            FollowDetails: isAlreadyFollowing
        })
    }
    

    
    const followRecord = await followModel.create({
        follower:followerusername,
        following:followeeusername
    })

    res.status(201).json({
        message:'Successfully Followed ',
        followRecord
    })

    
}
async function userUnfollowController(req,res){
    const followerusername = req.user.username;
    const followeeusername = req.params.username;

    if(followerusername === followeeusername){
        return res.status(401).json({
            message:'You cannot unfollow yourself'
        })
    }
    
    const isUserfollowing = await followModel.findOne({
            follower:followerusername,
            following:followeeusername
    })



    if(!isUserfollowing){
        return res.status(401).json({
            message:`You are not following this ${followeeusername}`
        })
    }

    const Unfollow = await followModel.findByIdAndDelete(isUserfollowing)

    res.status(201).json({
        message:`You Unfollowed ${followeeusername} successfully `
    })
    
    
}


async function getFollowRequests(req,res){
    const username = req.user.username;
    
    
    const Followerlist = await followModel.findOne({
        following:username
    })
    if(!Followerlist){
        return res.status(201).json({
            message:'NO Follow requests',
            Followerlist
        })
    }
    res.status(201).json({
        message:'fetched',
        Followerlist
    })

}

async function AcceptFollowRequests(req,res){
    const username = req.user.username;
    const Followerusername = req.params.followername;

    const CheckRequest = await followModel.findOne({
        follower:Followerusername
    })

    if(!CheckRequest){
        return res.status(401).json({
            message:'Not found any request'
        })
    }

    const AcceptFollowRequests=await followModel.findOneAndUpdate({
        follower:CheckRequest.follower
    },{
        status:'accepted'        
    })

    const UpdatedCheck=await followModel.findOne({
        follower:Followerusername
    })

    res.status(200).json({
        message:'successfully accepted',
        "Previos Result":CheckRequest,
        "After Result":UpdatedCheck
        
    })
}


async function RejectFollowRequest(req,res){
    const username = req.user.username;
    const Followerusername = req.params.followerusername;

    const checkRequest = await followModel.findOne({
        follower:Followerusername
    })

    if(!checkRequest){
        return res.status(401).json({
            message:'This user has not sent any request'
        })
    }

    const RejectRequest = await followModel.findOneAndUpdate({
        follower:Followerusername
    },{
        status:'rejected'
    })
    
    const updatedlist = await followModel.findOne({
        follower:Followerusername
    })
    res.status(201).json({
        RejectRequest,
        message:'request rejected successfully',
        updatedlist
    })
}


module.exports={userFollowController,userUnfollowController,getFollowRequests,AcceptFollowRequests,RejectFollowRequest}

