const Database = require('../config/Database')
const findAll = async () =>{
    const response = await Database.query(`
        SELECT * FROM room ORDER BY room_id
    `)

    return response.rows
}
const findRoomById = async (id) =>{
    const response = await Database.query(`
        SELECT * FROM room where room_id = $1
    `,[id])

    return response.rows
}
const save = async ({name, description_room,topic}) =>{
    const response = await Database.query(`
        INSERT INTO room(
            name, description_room,topic
        )values($1,$2,$3) returning *
    `, [name,description_room,topic])

    return response.rows[0]
}

const findById = async (id) =>{
    const response = await Database.query(`
        select room_id from room where room_id = $1
    `, [id])

    return response.rows[0]
}

const findByName = async (name) =>{
    const response = await Database.query(`
        select name,room_id from room where name = $1
    `, [name])
    return response.rows[0]
}

const findName = async (name) =>{
    const response = await Database.query(`
        select name from room where name = $1
    `, [name])

    return response.rows[0]
}

const remove = async (id) =>{
    Database.query(`
        delete from room where room_id = $1
    `, [id])
}

const update = async({id,name, description_room,topic}) =>{
    const response = await Database.query(`
        update room set name = $1, description_room=$2, topic=$3
        where room_id = $4 returning *
    `,[
        name, description_room, topic, id
    ])
    return response.rows[0]
}
module.exports = {
    findAll, save, findById, remove,update,findRoomById,findByName,findName
}