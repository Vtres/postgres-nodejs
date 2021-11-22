const { Router } = require('express');
const TopicService = require('../services/TopicService')

const TopicController = Router()

TopicController.get('', async (req, res) => {
    try {
        res.json(await TopicService.index())
    } catch (error) {
        res.status(500).json({ error: 'TopicService.index() is not working' })
    }
})

TopicController.post('', async (req, res) => {
    const {name} = req.body
    if (!name) {
        return res.status(400).json({ error: "Tópico em branco" })
    }

    try {
        const existsNameTopic = await TopicService.existsName(name)
        if (existsNameTopic) {
            res.status(404).json({ error: `Topico: ${name} já existe` })
        } else {
            try {
                const topic_id = await TopicService.create({name})
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

