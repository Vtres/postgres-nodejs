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
PostController.get('/:id', async (req,res)=>{
    const { id } = req.params
    try {
        const existsPost = await PostService.existsById(id)
        if (existsPost) {
            try {
                const response = await PostService.show(id)
                if(response){
                    res.status(200).json(response)
                    res.json()
                }else{
                    res.status(404).json({ error: `Post não encontrado` })
                }
                
            } catch (error) {
                res.status(500).json({ error: 'PostService.show() is not working' })
            }
        } else {
            res.status(404).json({ error: `ID: ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ error: 'PostService.existsById() is not working' })
    }
})
module.exports = PostController

