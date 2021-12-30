const ClientRooomRepository = require('../repositories/ClientRoomRepository')

const save = async ({id_user, id_room,type}) => {
    const room_id = id_room.room_id
    return await ClientRooomRepository.save({id_user, room_id,type})
}

const roomClient = async(user_id)=>{
    return await ClientRooomRepository.roomClient(user_id)
}

const erase = async(id) =>{
    ClientRooomRepository.remove(id)   
}

module.exports = {
    save,roomClient,erase
}