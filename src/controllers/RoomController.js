const { Router } = require('express');
const RoomService = require('../services/RoomService')
const FileService = require('../services/FileService')
const TopicService = require('../services/TopicService')
const ClientRoomService = require('../services/ClientRoomService')
const RoomTopicService = require('../services/RoomTopicService');
const { compare } = require('bcryptjs');

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
    var infoFile
    var obj = []
    try {
        const existsClient = await RoomService.existsById(id)
        if (existsClient) {
            try {
                const room = await RoomService.show(id)
                if (room) {
                    if (room.file_id) {
                        try {
                            infoFile = await FileService.searchFileById(room.file_id)
                        } catch (error) {
                            res.status(500).json({ error: 'FileService.searchFileById() is not working' })
                        }
                    }
                    // achar o dono da sala 
                    try {
                        const dono = await RoomService.dono(room.room_id)
                        if (dono) {
                            obj.push({
                                "room_id": room.room_id,
                                "name": room.name,
                                "description_room": room.description_room,
                                "file_id": room.file_id,
                                "id_public": room.id_public,
                                "date": room.date,
                                "nome": infoFile.nome,
                                "result": infoFile.result,
                                "dono": dono.id_client
                            })
                        }
                        res.json(obj)
                    } catch (error) {
                        res.status(500).json({ error: 'RoomService.dono() is not working' })
                    }
                }
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
    // nome, result, id_content,
    const { name, description_room, nome, result, id_user, id_public, topic } = req.body
    // console.log( name, description_room, nome, id_content,id_user, topic)
    var topics = [];
    var id_file;
    var id_room;
    try {
        if (name) {
            if (topic) {
                const aux = topic.map(async (i) => {
                    var existTopicId = await TopicService.existsName(i)
                    if (existTopicId) {
                        topics.push(existTopicId)
                    } else {
                        try {
                            var createTopicId = await TopicService.create(i)
                            topics.push(createTopicId)
                        } catch (error) {
                            res.status(500).json({ error: 'TopicService.create() is not working' })
                        }
                    }
                })
                await Promise.all(aux)
                // topic contem os ids => res.status(201).json(topics)   


            }
            if (nome && result) {
                try {
                    var id_content = null
                    id_file = await FileService.create({ nome, result, id_content })
                } catch (error) {
                    res.status(500).json({ error: 'FileService.create() is not working' })
                }
            }
            if (id_file) {
                // Se usuário quis uma img para a sala
                try {
                    const id = id_file.id
                    id_room = await RoomService.create({ name, description_room, id, id_public })
                } catch (error) {
                    res.status(500).json({ error: 'RoomService.create() is not working' })
                }


            } else {
                try {
                    const no_img = null;
                    id_room = await RoomService.create({ name, description_room, no_img, id_public })
                } catch (error) {
                    res.status(500).json({ error: 'RoomService.create() is not working' })
                }
            }

            if (id_user) {
                try {
                    const type = 'D'
                    const sucess = await ClientRoomService.save({id_user, id_room, type})
                } catch (error) {
                    res.status(500).json({ error: 'ClientRoomService.save() is not working' })
                }
            } else {
                res.status(500).json({ error: 'Sem usuário definido' })
            }
            // ligacoes com outras tabelas agora 
            if (topics) {
                var cont = 1;
                const aux = topics.map(async (i) => {
                    try {
                        var roomTopic = await RoomTopicService.save(id_room.room_id, i.topic_id)
                    } catch (error) {
                        res.status(500).json({ error: 'RoomTopicSerice.save() is not working' })
                    }
                })
                await Promise.all(aux)

                res.status(200).json({ message: 'OK' })
                res.json()


            } else {
                res.status(200).json({ message: 'OK' })
                res.json()
            }
        } else {
            return res.status(400).json('Erro nos dados enviados, tente novamente!')
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }





    // if (!name || !topic) {
    //     return res.status(400).json({ error: "Há campos não informados" })
    // }

    // try {
    //     const existsNameRoom = await RoomService.existsName(name)
    //     if (!existsNameRoom) {
    //         try {
    //             res.status(201).json(await RoomService.create({ name, description_room, topic }))
    //         } catch (error) {
    //             res.status(500).json({ error: 'RoomService.create() is not working' })
    //         }
    //     } else {
    //         res.status(404).json({ error: `Name: ${name} já existe` })
    //     }

    // } catch (error) {
    //     res.status(500).json({ error: 'RoomService.create() is not working' })
    // }
})

RoomController.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const existsRoom = await RoomService.existsById(id)
        if (existsRoom) {
            try {
                ClientRoomService.erase(id)
                RoomService.erase(id)
                RoomTopicService.erase(id)
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
            if (existsNameRoom === undefined) {
                try {
                    res.json(await RoomService.update({ id, name, description_room, topic }))
                } catch (error) {
                    res.status(500).json({ error: 'RoomService.create() is not working' })
                }
            } else if (existsNameRoom.room_id == id) {
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


RoomController.post('/join', async (req, res) => {
    const { id_user, id_room } = req.body
    var user_id = id_user
    var room_id = id_room
    var type = "U";
    const typeUser = await RoomService.checkType(id_user, id_room)
    if (typeUser==undefined) {
        try {            
            var final = await ClientRoomService.saveTypeUser(user_id,room_id,type)
            res.json("Inscrito com sucesso!")
        } catch (error) {
            res.status(500).json({ error: 'ClientRoomService.save() is not working' })
        }
    } else if (typeUser.type == 'D') {
        res.json("Você é o dono dessa sala")
    } else if (typeUser.type == 'U') {
        res.json("Você já está inscrito nessa sala")
    }





})
module.exports = RoomController