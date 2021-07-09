const express = require('express');
const ClientController = require('./controllers/ClientController')
const RoomController = require('./controllers/RoomController')
const controllers = express();

controllers.use('/client', ClientController)
controllers.use('/room', RoomController)

module.exports = controllers
