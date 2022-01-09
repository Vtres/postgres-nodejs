const { Router } = require('express');
const ClassService = require('../services/ClassService')
const ClassController = Router()

ClassController.post('', async (req, res) => {
    const { title, id_room } = req.body
    if (!title || !id_room) {
        return res.status(400).json({ error: "Não é possivel criar uma aula!" })
    }

    try {
        res.status(201).json(await ClassService.createClass(title, id_room))
    } catch (error) {
        res.status(500).json({ error: 'ClassService is not working' })
    }
})
// recebe o id do post para entao prcurar os comentarios desse post
ClassController.get('/:id', async (req, res) => {
    const { id } = req.params
    var obj = []
    try {
        const response = await ClassService.showById(id)
        if (response) {
            res.status(200).json(response)
            // res.json()
        } else {
            res.status(404).json({ error: `Post não encontrado` })
        }
    } catch (error) {
        res.status(500).json({ error: 'PostService.existsById() is not working' })
    }
})

ClassController.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        ClassService.destroy(id)
        res.json()
    } catch (error) {
        res.status(500).json({ error: 'ClientService.destroy() is not working' })
    }
})

module.exports = ClassController