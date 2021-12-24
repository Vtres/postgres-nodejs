const Database = require('../config/Database')

const save = async ({id_user, room_id,type}) =>{
    const response = await Database.query(`
        INSERT INTO client_room(
            id_client, id_room,type
        )values($1,$2,$3) returning *
    `, [id_user,room_id,type])

    return response.rows[0]
}

const roomClient = async(user_id)=>{
    const response = await Database.query(`
        SELECT id_room, type FROM client_room WHERE id_client = $1
    `,[user_id])
    return response.rows;
}

module.exports = {
    save,roomClient
}