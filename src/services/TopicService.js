const TopicRepository = require('../repositories/TopicRepository')

const index = async () =>{
    return await TopicRepository.findAllTopic()
}

const existsName = async(name)=>{
    return await TopicRepository.findByName(name)
}

const create = async(name)=>{
    return await TopicRepository.save(name)
}

const list = async () =>{
    return await TopicRepository.listRoomTopic()
}

const listRoomById = async (id)=>{
    return await TopicRepository.listRoomById(id)
}

module.exports = {
    index, existsName, create, list,listRoomById
}