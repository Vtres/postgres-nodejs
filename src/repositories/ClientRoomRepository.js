const Database = require('../config/Database')

const save = async ({id_user, room_id,type}) =>{
    const response = await Database.query(`
        INSERT INTO client_room(
            id_client, id_room,type
        )values($1,$2,$3) returning *
    `, [id_user,room_id,type])

    return response.rows[0]
}
const saveTypeUser = async (user_id,room_id,type) =>{
    const response = await Database.query(`
        INSERT INTO client_room(
            id_client, id_room,type
        )values($1,$2,$3) returning *
    `, [user_id,room_id,type])

    return response.rows[0]
}

const roomClient = async(user_id)=>{
    const response = await Database.query(`
        SELECT id_room, type FROM client_room WHERE id_client = $1
    `,[user_id])
    return response.rows;
}

const remove = async (id) => {
    Database.query(`
        delete from client_room where id_room = $1
    `, [id])
}

const exit = async (id) => {
    Database.query(`
        delete from client_room where id_room = $1 and type='U'
    `, [id])
}


module.exports = {
    save,roomClient,remove,saveTypeUser,exit
}