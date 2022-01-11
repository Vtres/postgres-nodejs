const Database = require('../config/Database')

const save = async (title,id_room) =>{
    const response = await Database.query(`
        INSERT INTO class(
            title,date_class,id_room
        )values($1,current_timestamp,$2)
    `, [title,id_room])

    return response.rows[0]
}

const showById = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM class WHERE id_room = $1 ORDER BY date_class
    `,[id])

   return response.rows
}

const destroy = async(id)=>{
    Database.query(`
        DELETE FROM class WHERE class_id = $1
    `,[id])
}

module.exports = {
    save,showById,destroy
}