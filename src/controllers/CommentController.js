const { Router } = require('express');
const CommentService = require('../services/CommentService')
const PostService = require('../services/PostService')

const CommentController = Router()

CommentController.post('', async (req, res)=>{
    const { message, id_post} = req.body
    if (!message || !id_post ) {
        return res.status(400).json({ error: "Não é possivel responder esse post" })
    }

    try {
        res.status(201).json(await CommentService.createComment(message,id_post))
    } catch (error) {
        res.status(500).json({ error: 'CommentService is not working or id_post invalid' })
    }
})
// recebe o id do post para entao prcurar os comentarios desse post
CommentController.get('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const existsPost = await PostService.existsById(id)
        if (existsPost) {
            try {
                res.status(200).json(await CommentService.showById(id))
                res.json()
            } catch (error) {
                res.status(500).json({ error: 'CommentService.showById() is not working' })
            }
        } else {
            res.status(404).json({ error: `ID: ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ error: 'PostService.existsById() is not working' })
    }
})

module.exports = CommentController