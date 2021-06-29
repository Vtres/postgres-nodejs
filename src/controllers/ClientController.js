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

ClientController.post('', async (req,res)=>{
    const {name, surname,email,senha,nick_name} = req.body

    if(!name || !surname || !email || !senha || !nick_name){
        return res.status(400).json({error:"Há campos não informados"})
    }

    try {
        res.status(201).json(await ClientService.store({name, surname,email,senha,nick_name}))
    } catch (error) {
        res.status(500).json({error: 'ClientService.store() is not working'})
    }
})

module.exports = ClientController