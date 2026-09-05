const jwt = require('jsonwebtoken')

async function IdentifyUser(req,res,next){

    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:'token not found Unauthorized access'
        })
    }
    let  decoded;
    try{
        
        decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        
    }catch(err){
        return res.status(401).json({
            message:'token not verified '
        })
    }


    req.user = decoded;
 
    next();
    
}

module.exports=IdentifyUser