const {Router} = require('express');

const ClientController = Router()
ClientController.get('', (req,res)=>{
    res.send("deu certo")
})

module.exports = ClientController