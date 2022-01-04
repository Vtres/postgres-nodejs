const Database = require('../config/Database')

const create = async (title,id_room) =>{
    const response = await Database.query(`
        INSERT INTO contents(
            description_contents,date_contents,id_class
        )values($1,current_timestamp,$2)
    `, [title,id_room])

    return response.rows[0];
}

const list = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM contents WHERE id_class = $1
    `,[id])

   return response.rows[0]
}

module.exports = {
    create,list
}