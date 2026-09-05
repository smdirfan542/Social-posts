const express = require('express')
const postControllers=require('../Controllers/post.controller')
const postRouter=express.Router();
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

const authMiddleware = require('../Middleware/auth.middleware');
const IdentifyUser = require('../Middleware/auth.middleware');



postRouter.post('/',upload.single('postman-image'),authMiddleware,postControllers.createpostController)
postRouter.delete('/deleteposts',postControllers.deletePostsController)
postRouter.get('/',authMiddleware,postControllers.getUserPostController)
postRouter.get('/postdetails/:postId',authMiddleware,postControllers.postDetailsController)


postRouter.post('/like/:postId',IdentifyUser,postControllers.likePostController)
postRouter.post('/unlike/:postId',IdentifyUser,postControllers.unlikePostController)

postRouter.get('/feed',IdentifyUser,postControllers.getFeedController)


module.exports= postRouter;