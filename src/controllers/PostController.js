const { Router } = require('express');
const PostService = require('../services/PostService')
const FileService = require('../services/FileService')
const PostRepository = require('../repositories/PostRepository')
const PostController = Router()

PostController.post('', async (req, res) => {
    const { id_user, title, description, name, result } = req.body
    console.log({ id_user, title, description, name, result })
    if (!id_user || !title || !description) {
        return res.status(400).json({ error: "Não é possivel criar esse post" })
    }

    try {
        if (name && result) {
            try {
                const id_post = await PostService.createResultId(id_user, title, description)

                if (id_post) {
                    res.status(201).json(await FileService.fileCreatePost(name, result, id_post))
                } else {
                    res.status(500).json({ error: 'PostService.createResultId() is not working' })
                }

            } catch (error) {
                res.status(500).json({ error: 'PostService.createResultId() is not working' })
            }
        } else {
            try {
                res.status(201).json(await PostService.createResultId(id_user, title, description))
            } catch (error) {
                res.status(500).json({ error: 'PostService.createResultId() is not working' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'PostService is not working' })
    }
})

PostController.get('', async (req, res) => {
    var user = []
    var final = []
    try {
        const post = await PostService.index()
        const aux = post.map(async (p) => {
            try {
                var existClient = await PostRepository.findClientById(p.id_client)
                if (existClient) {
                    user.push({
                        "name": existClient.name,
                        "user_id": existClient.user_id,
                        "surname": existClient.surname,
                        "file_id": existClient.file_id
                    })
                }

            } catch (error) {
                res.status(500).json({ error: 'ClientService.show() is not working' })

            }
        })
        await Promise.all(aux)

        if (user.file_id) {
            try {
                const infofile = await FileService.fileClient(user.file_id)
                console.log(infofile)
                if (infofile) {
                    for (var i = 0; i < user.length; i++) {
                        final.push({
                            "name_user": user[i].name,
                            "surname": user[i].surname,
                            "user_id": user[i].user_id,
                            "file_id": user[i].file_id,
                            "post_id": post[i].post_id,
                            "title": post[i].title,
                            "description_post": post[i].description_post,
                            "date_post": post[i].date_post,
                            "nome_file": infofile.nome,
                            "result": infofile.result
                        })
                    }
                }
            } catch (error) {
                res.status(500).json({ error: 'FileService.fileClient() is not working' })
            }
        } else {
            for (var i = 0; i < user.length; i++) {
                final.push({
                    "name_user": user[i].name,
                    "surname": user[i].surname,
                    "user_id": user[i].user_id,
                    "file_id": user[i].file_id,
                    "post_id": post[i].post_id,
                    "title": post[i].title,
                    "description_post": post[i].description_post,
                    "date_post": post[i].date_post
                })
            }
        }
        res.status(201).json(final)
    } catch (error) {
        res.status(500).json({ error: 'PostService.index() is not working' })
    }
})
PostController.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const existsPost = await PostService.existsById(id)
        console.log(existsPost)
        if (existsPost) {
            try {
                const response = await PostService.show(id)
                if (response) {
                    res.status(200).json(response)
                    res.json()
                } else {
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

