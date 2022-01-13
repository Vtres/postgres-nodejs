const Database = require('../config/Database')

const save = async (id_user, title, description) => {
    // const response = await Database.query(`
    //     INSERT INTO post(
    //         name, description_room,topic
    //     )values($1,$2,$3) returning *
    // `, [name,description_room,topic])

    // return response.rows[0]
}

const createPostResultId = async (id_user, title, description) => {
    const response = await Database.query(`
        INSERT INTO post(
            title, description_post, id_client, date_post
        )values($1,$2,$3,current_timestamp) returning post_id
    `, [title, description, id_user])
    return response.rows[0].post_id;
}
const findAll = async () => {
    const response = await Database.query(`
        SELECT * FROM post p
        WHERE p.date_post>= ('01/'||to_char(current_date,'mm/yyyy'))::date - interval '1 month' ORDER BY date_post DESC
    `)

    return response.rows
}

const findById = async (id) => {
    const response = await Database.query(`
        select post_id from post where post_id = $1
    `, [id])
    return response.rows[0]
}

const findPostById = async (id) => {
    const response = await Database.query(`
    SELECT p.post_id,
            p.title,
            p.description_post,
            p.date_post,
            p.id_client,
            f.nome,
            f.result,
            c.name,
            c.surname
        from post p
        left join files f on p.post_id = f.id_post 
        join client c on p.id_client = c.user_id
        where p.post_id = $1
    `, [id])

    return response.rows[0]
}

const findClientById = async (id) => {
    const response = await Database.query(`
        SELECT * FROM client where user_id = $1
    `, [id])
    return response.rows[0]
}
module.exports = {
    save, createPostResultId, findAll, findById, findPostById,findClientById
}