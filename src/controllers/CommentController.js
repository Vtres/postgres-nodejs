const { Router } = require('express');
const CommentService = require('../services/CommentService')
const TopicService = require('../services/TopicService')

const CommentController = Router()

CommentController.post('', async (req, res)=>{

})

module.exports = CommentController