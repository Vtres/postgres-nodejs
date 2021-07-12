const RoomRepository = require('../repositories/RoomRepository')

const index = async () =>{
    return await RoomRepository.findAll()
}

const create = async ({name, description_room,topic}) => {
    return await RoomRepository.save({name, description_room,topic})
}

const existsById = async(id) => {
    const response = await RoomRepository.findById(id)
    return response ? true : false
}

const existsByName = async(name) => {
    const response = await RoomRepository.findByName(name)
    return response
}

const existsName = async(name) => {
    const response = await RoomRepository.findByName(name)
    return response ? true : false
}

const erase = async(id) =>{
    RoomRepository.remove(id)   
}

const update = async({id, name, description_room,topic}) =>{
    return await RoomRepository.update({id,name, description_room,topic})
}

const show = async(id) =>{
    return await RoomRepository.findRoomById(id)
}
module.exports = {
    index, create, existsById, erase, update,show,existsByName,existsName
}