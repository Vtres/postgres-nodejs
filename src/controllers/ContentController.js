const { Router } = require('express');
const ContentService = require('../services/ContentService')
const ContentController = Router()

// recebe o id da class para entao prcurar os conteudos desse aula
ContentController.get('/:id', async (req, res) => {
    const { id } = req.params
    try {

        res.status(200).json(await ContentService.list(id))

    } catch (error) {
        res.status(500).json({ error: 'ContentService.list() is not working' })
    }
})

ContentController.post('', async (req, res) => {
    const { text, id_class } = req.body
    try {
        res.status(201).json(await ContentService.create(text, id_class))
    } catch (error) {
        res.status(500).json({ error: 'ContentService.create() is not working' })
    }
})

module.exports = ContentController