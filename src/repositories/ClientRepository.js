const Database = require('../config/Database')
const findAll = async () =>{
    const response = await Database.query(`
        SELECT * FROM client ORDER BY user_id
    `)

    return response.rows
}
const findClientById = async (id) =>{
    const response = await Database.query(`
        SELECT * FROM client where user_id = $1
    `,[id])

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

const findById = async (id) =>{
    const response = await Database.query(`
        select user_id from client where user_id = $1
    `, [id])

    return response.rows[0]
}

const remove = async (id) =>{
    Database.query(`
        delete from client where user_id = $1
    `, [id])
}

const update = async({id,name, surname,email,senha,nick_name}) =>{
    const response = await Database.query(`
        update client set name = $1, surname=$2, email=$3, senha=$4, nick_name=$5, date=current_timestamp
        where user_id = $6 returning *
    `,[
        name, surname, email, senha, nick_name, id
    ])
    return response.rows[0]
}
module.exports = {
    findAll, save, findById, remove,update,findClientById
}