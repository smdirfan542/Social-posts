const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')

const cookieparser = require('cookie-parser')
app.use(express.json());
app.use(cookieparser());
app.use(cors(
  {  credentials:true,
    origin: "https://social-posts-frontend.onrender.com"}
))

const authRouter =  require('./Routes/auth.routes')
const postRouter=require('./Routes/post.routes')
const userRouter=require('./Routes/user.routes')

const publicpath=path.join(__dirname,"../public")

app.use('/auth',authRouter);
app.use('/posts',postRouter);
app.use('/users',userRouter)

app.use(express.static(publicpath))


app.get("*sfsda",(req,res)=>{
  res.sendFile(path.join(publicpath,"index.html"))
})



module.exports = app;
