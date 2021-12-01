const PostRepository = require('../repositories/PostRepository')

const create = async(name)=>{
    return await PostRepository.save(name)
}

const createResultId = async(id_user, title, description)=>{
    return await PostRepository.createPostResultId(id_user, title, description)
}

const index = async()=>{
    return await PostRepository.findAll()
}

const existsById = async(id)=>{
    const response = await PostRepository.findById(id)
    return response ? true : false
}

const show = async(id)=>{
    return await PostRepository.findPostById(id)
}

module.exports = {
   create,createResultId,index,existsById,show
}