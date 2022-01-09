const Database = require('../config/Database')

const create = async (title,id_class) =>{
    const response = await Database.query(`
        INSERT INTO contents(
            description_contents,date_contents,id_class
        )values($1,current_timestamp,$2) returning *
    `, [title,id_class])
    return response.rows[0];
}

const list = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM contents WHERE id_class = $1
    `,[id])

   return response.rows[0]
}

const existContentByClassId = async(id)=>{
    const response = await Database.query(`
        SELECT id_class from contents where id_class = $1
    `,[id])
    return response.rows
}

const update = async (text,id_class) => {
    const response = await Database.query(`
        update contents set description_contents = $1, date_contents=current_timestamp
        where id_class = $2 returning *
    `, [
        text, id_class
    ])
    return response.rows
}

const returnIdContentByIdClass = async(id)=>{
    const response = await Database.query(`
        SELECT contents_id from contents where id_class = $1
    `,[id])
    return response.rows
}

module.exports = {
    create,list,existContentByClassId,update,returnIdContentByIdClass
}
    