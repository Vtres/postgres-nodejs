const { Router } = require('express');
const CommentService = require('../services/CommentService')
const PostService = require('../services/PostService')
const ClientService = require('../services/ClientService')
const CommentController = Router()

CommentController.post('', async (req, res) => {
    const { message, id_post, id_client } = req.body
    console.log({ message, id_post, id_client })
    if (!message || !id_post || !id_client) {
        return res.status(400).json({ error: "Não é possivel responder esse post" })
    }

    try {
        res.status(201).json(await CommentService.createComment(message, id_post, id_client))
    } catch (error) {
        res.status(500).json({ error: 'CommentService is not working or id_post invalid' })
    }
})
// recebe o id do post para entao prcurar os comentarios desse post
CommentController.get('/:id', async (req, res) => {
    const { id } = req.params
    var obj = []
    try {
        const existsPost = await PostService.existsById(id)
        if (existsPost) {
            try {
                const data = await CommentService.showById(id)
                const aux = data.map(async (i) => {
                    try {
                        if(i.id_client != null){
                            // console.log('dentro do if', i.id_client)
                            // data eh um array entao nao vai encontrar data.comment_id -> preciso dizer data[0].comment_id                            
                            var existClient = await ClientService.show(i.id_client)
                            if (existClient) {
                                obj.push({
                                    "comment_id": i.comment_id,
                                    "message": i.message,
                                    "date_comment": i.date_comment,
                                    "id_post": i.id_post,
                                    "user_id": existClient.user_id,
                                    "name": existClient.name,
                                    "surname": existClient.surname
                                })
                            }
                        }  
                    } catch (error) {
                        res.status(500).json({ error: 'ClientService.show() is not working'})
                    }
                })
                await Promise.all(aux)
                res.status(201).json(obj) 


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