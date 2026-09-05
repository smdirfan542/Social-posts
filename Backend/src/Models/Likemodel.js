const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:[true,'post id is required for creating a like']
    },
    user:{
    type:String,
    required:[true,'username is required to create a like']
    },
},{timestamps:true})

LikeSchema.index({post:1,user:1},{unique:true})

const likeModel= mongoose.model('like-mdl',LikeSchema);
module.exports=likeModel;