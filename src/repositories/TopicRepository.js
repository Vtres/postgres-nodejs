const Database = require('../config/Database')

const findAllTopic  = async () =>{
    const response = await Database.query(`
        SELECT * FROM topic ORDER BY topic_id
    `)

    return response.rows
}

const findByName = async (name) =>{
    const response = await Database.query(`
        SELECT topic_id from topic where name = $1
    `, [name])
    return response.rows[0]
}

const save = async(name)=>{
    const response = await Database.query(`
        INSERT INTO topic(
            name
        )values($1) returning topic_id
    `, [name])
    return response.rows[0]
}

module.exports = {
    findAllTopic, findByName, save
}
