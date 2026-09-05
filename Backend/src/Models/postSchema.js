const mongoose = require('mongoose')

const postscm=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    ImageUrl:{
        type:String,
        required:[true,'url for profile pic is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'userid is required for creating the post']        
    }
})

const postModel = mongoose.model('posts',postscm);

module.exports=postModel;