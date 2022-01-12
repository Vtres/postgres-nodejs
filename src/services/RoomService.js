const RoomRepository = require('../repositories/RoomRepository')

const index = async () =>{
    return await RoomRepository.findAll()
}

const create = async ({name, description_room,id,id_public}) => {
    return await RoomRepository.save({name, description_room,id,id_public})
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
const listAllDataRoom = async(id_room)=>{
    return await RoomRepository.listAllDataRoom(id_room)
}

const dono = async(id_room)=>{
    return await RoomRepository.dono(id_room)
}
const checkType = async(id_user, id_room)=>{
    return await RoomRepository.checkType(id_user, id_room)
}
module.exports = {
    index, create, existsById, erase, update,show,existsByName,existsName,listAllDataRoom,dono,checkType
}