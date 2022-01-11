const { Router } = require('express');
const TopicService = require('../services/TopicService')
const RoomService = require('../services/RoomService')
const FileService = require('../services/FileService')
const TopicController = Router()

TopicController.get('', async (req, res) => {
    try {
        res.json(await TopicService.index())
    } catch (error) {
        res.status(500).json({ error: 'TopicService.index() is not working' })
    }
})

TopicController.get('/room/:id', async (req, res) => {
    const { id } = req.params
    const allInfo = []
    try {
        const room_id = await TopicService.listRoomById(id)
        if (room_id) {
            const aux = room_id.map(async (data) => {
                try {
                    const id_dono_room = await RoomService.dono(data.id_room)
                    if (id_dono_room) {
                        try {
                            const dadosRoom = await RoomService.show(data.id_room)
                            if (dadosRoom) {
                                if (dadosRoom.file_id) {
                                    try {
                                        const dadosFile = await FileService.searchFileById(dadosRoom.file_id)
                                        if (dadosFile) {

                                            allInfo.push({
                                                "room_id": dadosRoom.room_id,
                                                "name": dadosRoom.name,
                                                "description_room": dadosRoom.description_room,
                                                "file_id": dadosRoom.file_id,
                                                "id_public": dadosRoom.id_public,
                                                "date": dadosRoom.date,
                                                "nome": dadosFile.nome,
                                                "result": dadosFile.result,
                                                "id_dono": id_dono_room.id_client
                                            })
                                        }
                                    } catch (error) {
                                        res.status(500).json({ error: 'FileService.searchFileById() is not working' })
                                    }
                                } else {
                                    allInfo.push({
                                        "room_id": dadosRoom.room_id,
                                        "name": dadosRoom.name,
                                        "description_room": dadosRoom.description_room,
                                        "file_id": dadosRoom.file_id,
                                        "id_public": dadosRoom.id_public,
                                        "date": dadosRoom.date,
                                        "nome": null,
                                        "result": null,
                                        "id_dono": id_dono_room.id_client
                                    })
                                }

                            }
                        } catch (error) {

                        }

                    }
                } catch (error) {
                    res.status(500).json({ error: 'RoomService.dono() is not working' })
                }
            })
            await Promise.all(aux)
            res.status(200).json(allInfo)
        }

    } catch (error) {
        res.status(500).json({ error: 'TopicService.listRoomById() is not working' })
    }
})

TopicController.post('', async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ error: "Tópico em branco" })
    }

    try {
        const existsNameTopic = await TopicService.existsName(name)
        if (existsNameTopic) {
            res.status(404).json({ error: `Topico: ${name} já existe` })
        } else {
            try {
                const topic_id = await TopicService.create(name)
                res.status(201).json(topic_id.topic_id)

            } catch (error) {
                res.status(500).json({ error: 'RoomService.create() is not working' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'TopicService.topic_create() is not working' })
    }
})

module.exports = TopicController

