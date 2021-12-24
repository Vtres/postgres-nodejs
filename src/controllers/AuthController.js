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
        const userInfo = await ClientService.findUserByEmail(email)
        const passwordValidated = await ClientService.validatePassword(senha, userInfo.senha)
        if (!passwordValidated) {
            return res.json({signin_error: 'Senha inválida' })
        }

        const SECRET_KEY = process.env.SECRET_KEY
        if (!SECRET_KEY) {
            return res.status(401).json({ error: 'Environment SECRET_KEY is empty' })
        }
        try {
            const  id  = userInfo.user_id
            const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            res.json([token, userInfo.user_id])
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

    if(token){
        try {
            const tokenVerified = jwt.verify(token, SECRET_KEY)
            if(tokenVerified && tokenVerified.id){
                return res.json({status_token:true})
            }else{
                return res.json({status_token:false, status_error: 'Não autorizado com esse token inválido'})
            }
        } catch (error) {
            if(error && error.name === 'JsonWebTokenError'){
                return res.json({status_token:false, status_error: 'Não autorizado com esse token inválido'})
            }else if(error && error.name === 'TokenExpiredError'){
                return res.json({status_token:false, status_error: 'Não autorizado com esse token expirado'})
            }
        }
    }else{
        return res.json({status_token:false, status_error: 'Não autorizado com esse token inválido'})
    }
    // try {
    //     if (token) {
    //         jwt.verify(token,SECRET_KEY)
    //         ? res.json({status: true})
    //         : res.json({status: false})
    //     } else {
    //         res.json({status: false})
    //     }
    // } catch (error) {
    //     return res.status(500).json({error: error})
    // }
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