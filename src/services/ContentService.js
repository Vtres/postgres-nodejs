const ContentRepository = require('../repositories/ContentRepository')

const create = async(text,id_class)=>{
    return await ContentRepository.create(text,id_class)
}

const list = async(id)=>{
    return await ContentRepository.list(id)
}

module.exports = {
    create,list
}