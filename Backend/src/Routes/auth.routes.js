const express = require('express')
const authController = require('../Controllers/auth.controller')


const authRouter = express.Router();

authRouter.post('/register',authController.registerController);

authRouter.delete('/deletedata',authController.deleteController)

authRouter.get('/gettoken',authController.tokenController)

authRouter.post('/login',authController.loginController);

authRouter.post('/logout',authController.logoutController);

module.exports = authRouter;