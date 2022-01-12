const express = require('express');
const ClientController = require('./controllers/ClientController')
const RoomController = require('./controllers/RoomController')
const TopicController = require('./controllers/TopicController')
const AuthController = require('./controllers/AuthController')
const PostController = require('./controllers/PostController')
const FileController=require('./controllers/FileController')
const CommentController=require('./controllers/CommentController')
const {checkAuth} = require('./controllers/InterceptorController');
const ClassController = require('./controllers/ClassController');
const ContentController = require('./controllers/ContentController')
const ClientRoomController = require('./controllers/ClientRoomController')

const controllers = express();

controllers.use('/client', checkAuth('USER'), ClientController)
controllers.use('/room', checkAuth('USER'), RoomController)
controllers.use('/topic', TopicController)
controllers.use('/file', FileController)
controllers.use('/post', PostController)
controllers.use('/comment', CommentController)
controllers.use('/class', ClassController)
controllers.use('/content', ContentController)
controllers.use('/clientRoom/', ClientRoomController)
controllers.use('/auth', AuthController)



module.exports = controllers
