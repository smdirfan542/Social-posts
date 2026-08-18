const express = require('express')
const app = express();
const userModel = require('./Models/usermodel')
const authRouter =  require('./Routes/auth.routes')
const cookieparser = require('cookie-parser')
app.use(express.json());
app.use(cookieparser());

app.use('/auth',authRouter);






module.exports = app;