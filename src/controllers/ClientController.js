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

ClientController.get('/:id', async (req,res)=>{
    const {id} = req.params

    try {
        const existsClient = await ClientService.existsById(id)
        if(existsClient){
            try {
                res.status(200).json(await ClientService.show(id))
                res.json()
            } catch (error) {
                res.status(500).json({error: 'ClientService.show() is not working'})
            }
        }else{
            res.status(404).json({error: `ID: ${id} not found`})
        }
    } catch (error) {
        res.status(500).json({error: 'ClientService.existsById() is not working'})
    }
})

ClientController.post('', async (req,res)=>{
    const {name, surname,email,senha,active} = req.body
    const errors = []
    if(!name){
        errors.push({error:'Nome está em branco'})
    }
    if(!surname ){
        errors.push({error:"Sobrenome está em branco"})
    }
    if(!email){
        errors.push({error:"Email está em branco"})
    }
    if(!email.match(/\S+@\S+\.\S+/)){
        errors.push({error:"Email inválido"})
    }
    if(!senha){
        errors.push({error:"Senha está em branco"})
    }

    if(errors.length > 0){
        return res.status(400).json(errors)
    }
    try {
       const emailExist = await ClientService.existsEmail(email)
       if(emailExist){
           return res.status(409).json({message: `Este email já esta em uso`})
       }else{
            res.status(201).json(await ClientService.store({name, surname,email,senha,active}))
       }
    } catch (error) {
        res.status(500).json({error: 'ClientService.existsEmail is not working'})
    }
})

ClientController.delete('/:id', async (req,res)=>{
    const {id} = req.params

    try {
        const existsClient = await ClientService.existsById(id)
        if(existsClient){
            try {
                ClientService.destroy(id)
                res.json()
            } catch (error) {
                res.status(500).json({error: 'ClientService.destroy() is not working'})
            }
        }else{
            res.status(404).json({error: `ID: ${id} not found`})
        }
    } catch (error) {
        res.status(500).json({error: 'ClientService.existsById() is not working'})
    }
})
ClientController.put('/:id', async (req,res)=>{
    const {id} = req.params
    const {name, surname,email,senha,nick_name} = req.body

    if(!name || !surname || !email || !senha || !nick_name){
        return res.status(400).json({error:"Há campos não informados"})
    }
    
    try {
        const existsClient = await ClientService.existsById(id)
        if(existsClient){
            try {
                res.json(await ClientService.update({id, name, surname,email,senha,nick_name}))
            } catch (error) {
                res.status(500).json({error: 'ClientService.destroy() is not working'})
            }
        }else{
            res.status(404).json({error: `ID: ${id} not found`})
        }
    } catch (error) {
        res.status(500).json({error: 'ClientService.existsById() is not working'})
    }
})
module.exports = ClientController