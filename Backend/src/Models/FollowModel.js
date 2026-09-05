const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower:String,
    following:String,
    status:{
        type:String,
        default:'pending',
        enum:{
            values:['pending','accepted','rejected'],
            message:'status can be pending , accepted or rejected'
        }
    }
        
    
},
{
    timestamps:true
})


followSchema.index({follower:1,following:1},{unique:true})


const followModel = mongoose.model('follow-details',followSchema);

module.exports=followModel;