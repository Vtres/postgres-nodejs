const Database = require('../config/Database')

const save = async (room_id, id_topic) =>{
    const response = await Database.query(`
        INSERT INTO room_topic(
            id_room, id_topic
        )values($1,$2) returning *
    `, [room_id,id_topic])

    return response.rows[0]
}

module.exports = {
    save
}