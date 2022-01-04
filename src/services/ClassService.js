const ClassRepository = require('../repositories/ClassRepository')

const createClass = async(title,id_room)=>{
    return await ClassRepository.save(title,id_room)
}

const showById = async(id)=>{
    return await ClassRepository.showById(id)
}
const destroy = async(id)=>{
    ClassRepository.destroy(id)
}
module.exports = {
    createClass,showById,destroy
}