const {Router} = require('express');
const ClientService = require('../services/ClientService')

const ClientController = Router()
ClientController.get('', async (req,res)=>{
    try {
        res.json(await ClientService.index())
    } catch (error) {
        res.status(500).json({error: 'ClientService.index() is not working'})
    }
})

module.exports = ClientController