const { Router } = require('express');
const RoomService = require('../services/RoomService')

const RoomController = Router()
RoomController.get('', async (req, res) => {
    try {
        res.json(await RoomService.index())
    } catch (error) {
        res.status(500).json({ error: 'RoomService.index() is not working' })
    }
})

RoomController.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const existsClient = await RoomService.existsById(id)
        if (existsClient) {
            try {
                res.status(200).json(await RoomService.show(id))
                res.json()
            } catch (error) {
                res.status(500).json({ error: 'RoomService.show() is not working' })
            }
        } else {
            res.status(404).json({ error: `ID: ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ error: 'RoomService.existsById() is not working' })
    }
})

RoomController.post('', async (req, res) => {
    const { name, description_room, topic } = req.body

    if (!name || !topic) {
        return res.status(400).json({ error: "Há campos não informados" })
    }

    try {
        const existsNameRoom = await RoomService.existsName(name)
        if (!existsNameRoom) {
            try {
                res.status(201).json(await RoomService.create({ name, description_room, topic }))
            } catch (error) {
                res.status(500).json({ error: 'RoomService.create() is not working' })
            }
        } else {
            res.status(404).json({ error: `Name: ${name} já existe` })
        }

    } catch (error) {
        res.status(500).json({ error: 'RoomService.create() is not working' })
    }
})

RoomController.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const existsRoom = await RoomService.existsById(id)
        if (existsRoom) {
            try {
                RoomService.erase(id)
                res.json()
            } catch (error) {
                res.status(500).json({ error: 'RoomService.erase() is not working' })
            }
        } else {
            res.status(404).json({ error: `ID: ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ error: 'RoomService.existsById() is not working' })
    }
})
RoomController.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, description_room, topic } = req.body

    if (!name || !topic) {
        return res.status(400).json({ error: "Há campos obrigatórios" })
    }

    try {
        const existsRoomId = await RoomService.existsById(id)
        if (existsRoomId) {
            const existsNameRoom = await RoomService.existsByName(name)
            console.log(existsNameRoom)
            if (existsNameRoom.room_id == id) {
                try {
                    res.json(await RoomService.update({ id, name, description_room, topic }))
                } catch (error) {
                    res.status(500).json({ error: 'RoomService.create() is not working' })
                }
            } else {
                res.status(404).json({ error: `Name: ${name} já existe` })
            }
        } else {
            res.status(404).json({ error: `ID: ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ error: 'RoomService.existsById() is not working' })
    }
})
module.exports = RoomController