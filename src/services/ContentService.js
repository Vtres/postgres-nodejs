const ContentRepository = require('../repositories/ContentRepository')

const create = async(text,id_class)=>{
    return await ContentRepository.create(text,id_class)
}

const list = async(id)=>{
    return await ContentRepository.list(id)
}
const existContentByClassId = async(id)=>{
    return await ContentRepository.existContentByClassId(id)
}

const update = async(text,id_class) =>{
    return await ContentRepository.update(text,id_class)
}

const returnIdContentByIdClass = async(id)=>{
    return await ContentRepository.returnIdContentByIdClass(id)
}

module.exports = {
    create,list,existContentByClassId,update,returnIdContentByIdClass
}