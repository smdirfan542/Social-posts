const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')

const cookieparser = require('cookie-parser')
app.use(express.json());
app.use(cookieparser());
app.use(cors(
  {  credentials:true,
    origin: "http://localhost:5173"}
))


const authRouter =  require('./Routes/auth.routes')
const postRouter=require('./Routes/post.routes')
const userRouter=require('./Routes/user.routes')


app.use('/auth',authRouter);
app.use('/posts',postRouter);
app.use('/users',userRouter)
app.use(path.join(__dirname,"public"))

app.get("*",(req,res)=>{
  res.sendFile(express.static(path.join(__dirname,"public","index.html")))
})



module.exports = app;