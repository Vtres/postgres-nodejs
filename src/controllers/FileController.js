const { Router } = require('express');
const FileService = require('../services/FileService')

const FileController = Router()

FileController.post('', async (req, res) => {
    const { name, result,id_content } = req.body

    if (!name || !result) {
        return res.status(400).json({ error: "Há campos não informados" })
    }

    try {
        res.status(201).json(await FileService.create({ name, result, id_content}))
    } catch (error) {
        res.status(500).json({ error: 'FileService.create() is not working' })
    }
})

FileController.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        res.status(201).json(await FileService.fileClient(id))
    } catch (error) {
        res.status(500).json({ error: 'FileService.fileClient() is not working' })
    }
})

module.exports = FileController