const { Router } = require('express');
const PostService = require('../services/PostService')
const FileService = require('../services/FileService')
const PostController = Router()

PostController.post('', async (req, res) => {
    const { id_user, title, description,name, result} = req.body
    if (!id_user || !title || !description) {
        return res.status(400).json({ error: "Não é possivel criar esse post" })
    }

    try {
        if(name && result){
            try {
                const id_post = await PostService.createResultId( id_user, title, description )

                if(id_post){
                    res.status(201).json(await FileService.fileCreatePost(name, result, id_post))                    
                }else{
                    res.status(500).json({ error: 'PostService.createResultId() is not working' })
                }
        
            } catch (error) {
                res.status(500).json({ error: 'PostService.createResultId() is not working' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'PostService is not working' })
    }
})

PostController.get('', async (req,res)=>{
    try {
        res.json(await PostService.index())
    } catch (error) {
        res.status(500).json({error: 'PostService.index() is not working'})
    }
})
module.exports = PostController

