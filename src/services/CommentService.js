const CommentRepository = require('../repositories/CommentRepository')

const createComment = async(message,id_post,id_client)=>{
    console.log(message, id_post, id_client)
    return await CommentRepository.save(message,id_post,id_client)
}

const showById = async(id)=>{
    return await CommentRepository.showCommentId(id)
}

module.exports = {
    createComment,showById
}