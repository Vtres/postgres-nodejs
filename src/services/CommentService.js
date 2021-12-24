const CommentRepository = require('../repositories/CommentRepository')

const createComment = async(message,id_post,id_client)=>{
    return await CommentRepository.save(message,id_post,id_client)
}

const showById = async(id)=>{
    return await CommentRepository.showCommentId(id)
}

// const createResultId = async(id_user, title, description)=>{
//     return await PostRepository.createPostResultId(id_user, title, description)
// }

// const index = async()=>{
//     return await PostRepository.findAll()
// }

// const existsById = async(id)=>{
//     const response = await PostRepository.findById(id)
//     return response ? true : false
// }

// const show = async(id)=>{
//     return await PostRepository.findPostById(id)
// }

module.exports = {
    createComment,showById
}