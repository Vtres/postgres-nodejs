const Database = require('../config/Database')

const save = async (id_user, title, description) =>{
    // const response = await Database.query(`
    //     INSERT INTO post(
    //         name, description_room,topic
    //     )values($1,$2,$3) returning *
    // `, [name,description_room,topic])

    // return response.rows[0]
}

const createPostResultId = async (id_user, title, description) =>{
    const response = await Database.query(`
        INSERT INTO post(
            title, description_post, id_client
        )values($1,$2,$3) returning post_id
    `,[title,description,id_user])
    return response.rows[0].post_id;
}
const findAll = async () =>{
    const response = await Database.query(`
        SELECT * FROM post p
        WHERE Extract('Month' From p.date_post) = (Extract('Month' From Now())) 
        AND Extract('year' From p.date_post) = (Extract('Year' From Now()));
    `)

    return response.rows
}

module.exports = {
    save,createPostResultId,findAll
}