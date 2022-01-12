const { Router } = require('express');
const ClientRoomService = require('../services/ClientRoomService')

const ClientRoomController = Router()
ClientRoomController.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {

        ClientRoomService.exit(id)
        res.json()
    } catch (error) {
        res.status(500).json({ error: ' ClientRoomService.erase() is not working' })
    }
})

module.exports = ClientRoomController