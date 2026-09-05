const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String,
        unique:[true,"username should be unique"],
    },
    email:{type:String,
        unique:[true,"the email should be unique"],
        required:[true,"email id is required"]
    },
    password:{type:String,
        required:[true,'password is must'],
        select:false
    },
    profile_pic:{type:String,
        default:'https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5rbm93biUyMHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww'
    },
    bio:String
    
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;