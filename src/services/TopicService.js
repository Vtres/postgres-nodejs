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

module.exports = {
    index, existsName, create
}