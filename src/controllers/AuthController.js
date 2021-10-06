const { Router } = require('express')
const ClientService = require('../services/ClientService')
const jwt = require('jsonwebtoken')
const AuthController = Router()

AuthController.post('/signin', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const emailExist = await ClientService.existsEmail(email)
        if (!emailExist) {
            return res.status(404).json({ message: `Este email não foi encontrado` })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "ClientService.existsEmail() is not working" })
    }

    try {
        const user = await ClientService.findUserByEmail(email)
        console.log(user)
        const passwordValidated = await ClientService.validatePassword(senha, user.senha)
        if (!passwordValidated) {
            return res.status(401).json({ error: 'Senha inválida' })
        }

        const SECRET_KEY = process.env.SECRET_KEY
        if (!SECRET_KEY) {
            return res.status(401).json({ error: 'Environment SECRET_KEY is empty' })
        }
        try {
            const { id } = user
            const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            res.json(token)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "jwt.sign() is not working" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "ClientService.validatePassword() is not working" })
    }
})


AuthController.post('/check-token', async (req, res) => {
    const { token } = req.body

    const SECRET_KEY = process.env.SECRET_KEY
    if (!SECRET_KEY) {
        return res.status(401).json({ error: 'Environment SECRET_KEY is empty' })
    }

    try {
        if (token) {
            jwt.verify(token,SECRET_KEY)
            ? res.json({status: true})
            : res.json({status: false})
        } else {
            res.json({status: false})
        }
    } catch (error) {
        return res.status(500).json({error: error})
    }
})

AuthController.post('/addUser', async (req, res) => {
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

module.exports = AuthController