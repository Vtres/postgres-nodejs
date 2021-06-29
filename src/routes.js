const express = require('express');
const ClientController = require('./controllers/ClientController')

const controllers = express();

controllers.use('/client', ClientController)

module.exports = controllers
