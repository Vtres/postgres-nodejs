const { Router } = require('express');
const ContentService = require('../services/ContentService')
const FileService = require('../services/FileService')
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

ContentController.get('/files/:id', async (req, res) => {
    // recebe o id da aula
    const { id } = req.params
    try {

        const id_content = await ContentService.returnIdContentByIdClass(id)
        if (id_content) {
            try {
                res.status(201).json(await FileService.filebyContentId(id_content[0].contents_id))
            } catch (error) {
                res.status(500).json({ error: 'FileService.filebyContentId() is not working' })
            }
        } else {
            res.status(401).json({ error: `id do conteudo: ${id_content[0].contents_id} não encontrado}` })
        }

    } catch (error) {
        res.status(500).json({ error: 'ContentService.returnIdContentByIdClass() is not working' })
    }
})

ContentController.post('', async (req, res) => {
    const { text, id_class, action } = req.body
    // action J-> join  action n-> new
    if (action == 'N') {
        try {
            const existClass = await ContentService.existContentByClassId(id_class)
            if (existClass.length>0) {
                try {
                    res.json(await ContentService.update(text, id_class))
                } catch (error) {
                    res.status(500).json({ error: 'ContentService.update() is not working' })
                }
            } else {
                try {
                    res.status(201).json(await ContentService.create(text, id_class))
                } catch (error) {
                    res.status(500).json({ error: 'ContentService.create() is not working' })
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'ContentService.existClass() is not working' })
        }
    } else if (action == 'J') {
        var dados
        try {
            const infoContent = await ContentService.list(id_class)
            if (infoContent) {
                dados = infoContent.description_contents + text
                try {
                    res.json(await ContentService.update(dados, id_class))
                } catch (error) {
                    res.status(500).json({ error: 'ContentService.update() is not working' })
                }
            } else {
                res.status(400).json({ error: 'Não é possivel fazer uma junção' })
            }
        } catch (error) {
            res.status(500).json({ error: 'ContentService.list() is not working' });
        }
    }

})

ContentController.post('/files', async (req, res) => {
    const { id_class, nameFile, result } = req.body
    try {
        const existContent = await ContentService.returnIdContentByIdClass(id_class)
        if (existContent[0]) {
            // existe conteudo, entao apenas criar arquivo
            try {
                var nome = nameFile
                var id_content = existContent[0].contents_id
                res.status(201).json(await FileService.create({ nome, result, id_content }))
            } catch (error) {
                res.status(500).json({ error: 'ContentService.update() is not working' })
            }
        } else {
            // Nao existe um conteudo, criar-lo antes para fazer ligacao com arquivo
            try {
                // res.status(201).json(await FileService.create(text, id_class))
                var text = null;
                const createContent = await ContentService.create(text, id_class)
                if (createContent) {
                    try {
                        var nome = nameFile
                        var id_content = createContent.contents_id
                        res.status(201).json(await FileService.create({ nome, result, id_content }))
                    } catch (error) {
                        res.status(500).json({ error: 'FileService.create() is not working' })
                    }
                } else {
                    res.status(500).json({ error: 'ContentService.create() is not working and Class dont exist' })
                }
            } catch (error) {
                res.status(500).json({ error: 'ContentService.create() is not working' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'ContentService.existContentByClassId() is not working' });
    }
})

ContentController.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        ContentService.destroy(id)
        res.json()
    } catch (error) {
        res.status(500).json({ error: 'ContentController.destroy() is not working' })
    }
})


module.exports = ContentController