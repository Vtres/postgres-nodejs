const Database = require('../config/Database')
const findAll = async () =>{
    const response = await Database.query(`
        SELECT * FROM client ORDER BY user_id
    `)

    return response.rows
}
const save = async ({name, surname,email,senha,nick_name}) =>{
    const response = await Database.query(`
        INSERT INTO client(
            name, surname, email,senha,nick_name,date
        )values($1,$2,$3,$4,$5,current_timestamp) returning *
    `, [name,surname,email,senha,nick_name])

    return response.rows[0]
}
module.exports = {
    findAll, save
}