const express = require('express');
const ClientController = require('./controllers/ClientController')
const RoomController = require('./controllers/RoomController')
const TopicController = require('./controllers/TopicController')
const AuthController = require('./controllers/AuthController')
const PostController = require('./controllers/PostController')
const FileController=require('./controllers/FileController')
const {checkAuth} = require('./controllers/InterceptorController')
const controllers = express();

controllers.use('/client', checkAuth('USER'), ClientController)
controllers.use('/room', checkAuth('USER'), RoomController)
controllers.use('/topic', TopicController)
controllers.use('/file', FileController)
controllers.use('/post', PostController)
controllers.use('/auth', AuthController)



module.exports = controllers
