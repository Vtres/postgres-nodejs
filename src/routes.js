const express = require('express');
const ClientController = require('./controllers/ClientController')
const RoomController = require('./controllers/RoomController')
const AuthController = require('./controllers/AuthController')
const {checkAuth} = require('./controllers/InterceptorController')
const controllers = express();

controllers.use('/client', checkAuth('USER'), ClientController)
controllers.use('/room', checkAuth('USER'), RoomController)
controllers.use('/auth', AuthController)


module.exports = controllers
