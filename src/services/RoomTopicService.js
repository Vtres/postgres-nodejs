const RoomTopicRepository = require('../repositories/RoomTopicRepository')

const save = async (id_room,id_topic) => {
    return await RoomTopicRepository.save(id_room,id_topic)
}

module.exports = {
    save
}